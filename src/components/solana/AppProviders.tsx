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
  CoinbaseWalletAdapter,
  NekoWalletAdapter,
  HyperPayWalletAdapter,

} from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  // const endpoint = clusterApiUrl("mainnet-beta"); // change to "devnet" for testing
  const endpoint = useMemo(() => {
    return "https://petcoinai.info/api/solana";
  }, []);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new NekoWalletAdapter(),
      new HyperPayWalletAdapter(),
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
