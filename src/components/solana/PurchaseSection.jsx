import React, { useState } from "react";
import SolSendIsland from "./SolSendIsland";

export default function PurchaseSection() {
  const [isTransactionInProgress, setIsTransactionInProgress] = useState(false);

  // Function to be passed to SendSol component to track transaction state
  const handleTransactionStateChange = (inProgress) => {
    setIsTransactionInProgress(inProgress);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Purchase RESQ Tokens
          </h3>
          <p className="text-gray-600">
            Join the pet-powered cryptocurrency revolution
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">🐾 How it works:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Connect your Solana wallet</li>
            <li>• Send SOL to purchase RESQ tokens</li>
            <li>• Support animal welfare worldwide</li>
            <li>• Get access to AI-powered pet care tools</li>
          </ul>
        </div>
        
        <SolSendIsland 
          onTransactionStateChange={handleTransactionStateChange}
        />
        
        {isTransactionInProgress && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-500 border-t-transparent mr-2"></div>
              <span className="text-sm font-medium text-yellow-800">
                Transaction in progress - Please don't leave this page
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}