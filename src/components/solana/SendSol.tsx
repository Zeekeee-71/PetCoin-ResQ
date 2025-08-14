import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { useWallet, WalletNotSelectedError } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { SystemProgram, Transaction, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle, ArrowRight } from "lucide-react";

const RECIPIENT = new PublicKey("AaHWh8pxgU6iE6m15Z7Hj93MZGTmwwCaJEbVYvPjApeD"); // <-- set this
const SOL_TO_RESQ_RATIO = 1600000; // 1 SOL = 1.6M RESQ tokens

export default function SendSol({ onTransactionStateChange }) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [solAmount, setSolAmount] = useState("0.625");
  const [resqAmount, setResqAmount] = useState("1000000");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [transactionSignature, setTransactionSignature] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const lamports = useMemo(() => {
    const n = Number(solAmount);
    return Number.isFinite(n) && n > 0 ? Math.round(n * LAMPORTS_PER_SOL) : 0;
  }, [solAmount]);

  const handleSolAmountChange = (value: string) => {
    setSolAmount(value);
    const solValue = Number(value);
    if (Number.isFinite(solValue) && solValue > 0) {
      setResqAmount(Math.round(solValue * SOL_TO_RESQ_RATIO).toString());
    } else {
      setResqAmount("0");
    }
  };

  const handleResqAmountChange = (value: string) => {
    setResqAmount(value);
    const resqValue = Number(value);
    if (Number.isFinite(resqValue) && resqValue > 0) {
      setSolAmount((resqValue / SOL_TO_RESQ_RATIO).toFixed(6));
    } else {
      setSolAmount("0");
    }
  };

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
      setStatus(`Transaction successful! You will receive ${Number(resqAmount).toLocaleString()} RESQ tokens.`);
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
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700">
                Amount (SOL)
                <input
                  type="number"
                  step="0.000001"
                  min="0"
                  value={solAmount}
                  onChange={(e) => handleSolAmountChange(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="0.625"
                  disabled={busy}
                />
              </label>
            </div>
            
            <div className="flex items-center justify-center mt-6">
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700">
                RESQ Tokens
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={resqAmount}
                  onChange={(e) => handleResqAmountChange(e.target.value)}
                  className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="1000000"
                  disabled={busy}
                />
              </label>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            Conversion Rate: 1 SOL = {SOL_TO_RESQ_RATIO.toLocaleString()} RESQ
          </div>
          
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
              <br />
              <span className="text-sm text-gray-600">
                Watch this website for RESQ distribution details.
              </span>
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
