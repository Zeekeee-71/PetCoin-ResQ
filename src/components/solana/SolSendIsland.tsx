import React from "react";
import AppProviders from "./AppProviders";
import SendSol from "./SendSol";

export default function SolSendIsland({ onTransactionStateChange }) {
  return (
    <AppProviders>
      <SendSol onTransactionStateChange={onTransactionStateChange} />
    </AppProviders>
  );
}
