import React, { useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
//  BackpackWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const endpoint = clusterApiUrl("mainnet-beta"); // change to "devnet" for testing
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
//      new BackpackWalletAdapter(),
      new SolflareWalletAdapter({ network: "mainnet-beta" }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    []
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
