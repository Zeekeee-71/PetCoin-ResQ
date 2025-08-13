import React, { useCallback, useMemo, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { useWallet, WalletNotSelectedError } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { SystemProgram, Transaction, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle } from "lucide-react";

const RECIPIENT = new PublicKey("AaHWh8pxgU6iE6m15Z7Hj93MZGTmwwCaJEbVYvPjApeD"); // <-- set this

export default function SendSol({ onTransactionStateChange }) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [transactionSignature, setTransactionSignature] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const lamports = useMemo(() => {
    const n = Number(amount);
    return Number.isFinite(n) && n > 0 ? Math.round(n * LAMPORTS_PER_SOL) : 0;
  }, [amount]);

  const onSend = useCallback(async () => {
    try {
      if (!publicKey) throw new WalletNotSelectedError();
      if (lamports <= 0) throw new Error("Enter an amount > 0");

      setBusy(true);
      setStatus("Preparing transaction...");
      onTransactionStateChange?.(true);

      const balance = await connection.getBalance(publicKey);
      const feeBuffer = 5000; // small cushion for fees
      if (balance < lamports + feeBuffer) throw new Error("Insufficient SOL for amount + fee.");

      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("finalized");

      const tx = new Transaction({
        feePayer: publicKey,
        recentBlockhash: blockhash,
      }).add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: RECIPIENT,
          lamports,
        })
      );

      setStatus("Awaiting wallet confirmation...");
      const sig = await sendTransaction(tx, connection);

      setStatus("Submitting and confirming...");
      await connection.confirmTransaction({ signature: sig, blockhash, lastValidBlockHeight }, "confirmed");

      setTransactionSignature(sig);
      setIsSuccess(true);
      setStatus("Transaction successful! Your RESQ purchase is complete.");
      onTransactionStateChange?.(false);
    } catch (e: any) {
      setStatus(e?.message ?? "Transaction failed.");
      setIsSuccess(false);
      setTransactionSignature("");
      onTransactionStateChange?.(false);
    } finally {
      setBusy(false);
    }
  }, [publicKey, lamports, connection, sendTransaction]);

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Buy RESQ Tokens</h3>
        <p className="text-sm text-gray-600">Send SOL to purchase RESQ tokens</p>
      </div>
      
      <WalletMultiButton className="!w-full" />
      
      {publicKey && !isSuccess && (
        <>
          <label className="text-sm font-medium text-gray-700">
            Amount (SOL)
            <input
              type="number"
              step="0.000001"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="1.0"
              disabled={busy}
            />
          </label>
          
          <Button
            onClick={onSend}
            disabled={!publicKey || lamports <= 0 || busy}
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
            size="lg"
            variant="default"
          >
            {busy ? "Processing..." : "Purchase RESQ Tokens"}
          </Button>
        </>
      )}
      
      {!!status && (
        <div className={`p-4 rounded-lg border ${isSuccess ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
          {isSuccess && (
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-semibold text-green-800">Success!</span>
            </div>
          )}
          
          <div className={`text-sm ${isSuccess ? 'text-green-700' : 'text-gray-700'} mb-3`}>
            {status}
          </div>
          
          {transactionSignature && (
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => window.open(`https://solscan.io/tx/${transactionSignature}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Solscan
              </Button>
              
              <div className="text-xs text-gray-500 break-all">
                Transaction: {transactionSignature}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
