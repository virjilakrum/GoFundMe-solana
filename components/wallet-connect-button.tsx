"use client";

import * as React from "react";
import { Loader2, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSolanaWallet } from "@/contexts/solana-wallet-context";
import { toast } from "sonner";

interface WalletConnectButtonProps {
  variant?: "default" | "gradient" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function WalletConnectButton({
  variant = "gradient",
  size = "default",
  className,
}: WalletConnectButtonProps) {
  const { connected, connecting, publicKey, connect, disconnect } = useSolanaWallet();

  const handleClick = async () => {
    try {
      if (connected) {
        await disconnect();
      } else {
        if (!(window as any).solana) {
          window.open('https://phantom.app/', '_blank');
          toast.error("Please install Phantom Wallet");
          return;
        }
        await connect();
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
      toast.error("Failed to connect wallet");
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
      disabled={connecting}
    >
      {connecting ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Wallet className="mr-2 h-4 w-4" />
      )}
      {connected && publicKey
        ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
        : "Connect Wallet"}
    </Button>
  );
}