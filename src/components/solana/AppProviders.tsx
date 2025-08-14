import React, { useMemo } from "react";
import type { Commitment, ConnectionConfig } from "@solana/web3.js";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
  CoinbaseWalletAdapter,
  NekoWalletAdapter,
  HyperPayWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  // Your reverse-proxied endpoints
  const rpcEndpoint = useMemo(() => "https://petcoinai.info/api/solana", []);
  const wsEndpoint  = useMemo(() => "wss://petcoinai.info/api/solana/ws", []);

  const connectionConfig = useMemo<ConnectionConfig>(() => ({
    commitment: "processed" as Commitment,   // or "confirmed"/"processed"/"finalized"
    wsEndpoint,
    // optional tweaks:
    // confirmTransactionInitialTimeout: 60_000,
    // disableRetryOnRateLimit: true,
  }), [wsEndpoint]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new NekoWalletAdapter(),
      new HyperPayWalletAdapter(),
      new SolflareWalletAdapter({ network: "mainnet-beta" }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={rpcEndpoint} config={connectionConfig}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
