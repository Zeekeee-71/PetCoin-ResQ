import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SolSendIsland from "./SolSendIsland";

export default function PurchaseModal({ open, onOpenChange }) {
  const [isTransactionInProgress, setIsTransactionInProgress] = useState(false);

  // Prevent modal from closing during critical transaction phases
  const handleOpenChange = (newOpen) => {
    if (!newOpen && isTransactionInProgress) {
      // Don't allow closing during transaction
      return;
    }
    onOpenChange(newOpen);
  };

  // Function to be passed to SendSol component to track transaction state
  const handleTransactionStateChange = (inProgress) => {
    setIsTransactionInProgress(inProgress);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent 
        className={`sm:max-w-lg p-0 gap-0 bg-white ${isTransactionInProgress ? '[&>button]:hidden' : ''}`}
        // Disable escape key and overlay click during transaction
        onEscapeKeyDown={isTransactionInProgress ? (e) => e.preventDefault() : undefined}
        onInteractOutside={isTransactionInProgress ? (e) => e.preventDefault() : undefined}
      >
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Purchase RESQ Tokens
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-1">
            Join the pet-powered cryptocurrency revolution
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6 pt-2">
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
                  Transaction in progress - Please don't close this window
                </span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}