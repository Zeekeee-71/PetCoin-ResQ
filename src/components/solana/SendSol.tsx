import React, { useCallback, useMemo, useState } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { useWallet, WalletNotConnectedError } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { SystemProgram, Transaction, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const RECIPIENT = new PublicKey("YOUR_TREASURY_SOL_ADDRESS"); // <-- set this

export default function SendSol() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  const lamports = useMemo(() => {
    const n = Number(amount);
    return Number.isFinite(n) && n > 0 ? Math.round(n * LAMPORTS_PER_SOL) : 0;
  }, [amount]);

  const onSend = useCallback(async () => {
    try {
      if (!publicKey) throw new WalletNotConnectedError();
      if (lamports <= 0) throw new Error("Enter an amount > 0");

      setBusy(true);
      setStatus("Preparing transaction...");

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

      setStatus(`Success! ${sig}`);
    } catch (e: any) {
      setStatus(e?.message ?? "Transaction failed.");
    } finally {
      setBusy(false);
    }
  }, [publicKey, lamports, connection, sendTransaction]);

  return (
    <div className="flex flex-col gap-3 max-w-sm">
      <WalletMultiButton />
      <label className="text-sm">
        Amount (SOL)
        <input
          type="number"
          step="0.000001"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="1.0"
          disabled={busy}
        />
      </label>
      <button
        onClick={onSend}
        disabled={!publicKey || lamports <= 0 || busy}
        className="rounded px-4 py-2 border shadow"
      >
        {busy ? "Processing..." : "Send SOL"}
      </button>
      {!!status && <div className="text-xs opacity-80 break-all">{status}</div>}
    </div>
  );
}
