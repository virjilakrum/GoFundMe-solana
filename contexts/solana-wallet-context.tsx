"use client";

import * as React from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { toast } from "sonner";

interface SolanaWalletContextType {
  wallet: any;
  publicKey: PublicKey | null;
  connected: boolean;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const SolanaWalletContext = React.createContext<SolanaWalletContextType>({
  wallet: null,
  publicKey: null,
  connected: false,
  connecting: false,
  connect: async () => {},
  disconnect: async () => {},
});

export function SolanaWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wallet, setWallet] = React.useState<any>(null);
  const [publicKey, setPublicKey] = React.useState<PublicKey | null>(null);
  const [connected, setConnected] = React.useState(false);
  const [connecting, setConnecting] = React.useState(false);

  React.useEffect(() => {
    const checkWallet = () => {
      if (typeof window !== "undefined") {
        const solana = (window as any).solana;
        if (solana?.isPhantom) {
          setWallet(solana);
          if (solana.isConnected && solana.publicKey) {
            setPublicKey(solana.publicKey);
            setConnected(true);
          }
        }
      }
    };

    checkWallet();
    window.addEventListener('load', checkWallet);
    return () => window.removeEventListener('load', checkWallet);
  }, []);

  // Listen for wallet connection changes
  React.useEffect(() => {
    if (!wallet) return;

    const handleConnect = () => {
      if (wallet.publicKey) {
        setPublicKey(wallet.publicKey);
        setConnected(true);
        toast.success("Wallet connected successfully");
      }
    };

    const handleDisconnect = () => {
      setPublicKey(null);
      setConnected(false);
      toast.success("Wallet disconnected");
    };

    wallet.on('connect', handleConnect);
    wallet.on('disconnect', handleDisconnect);
    wallet.on('accountChanged', handleConnect);

    return () => {
      wallet.off('connect', handleConnect);
      wallet.off('disconnect', handleDisconnect);
      wallet.off('accountChanged', handleConnect);
    };
  }, [wallet]);

  const connect = React.useCallback(async () => {
    if (!wallet) {
      toast.error("Phantom wallet is not installed");
      return;
    }

    try {
      setConnecting(true);
      const response = await wallet.connect();
      setPublicKey(response.publicKey);
      setConnected(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet");
      throw error;
    } finally {
      setConnecting(false);
    }
  }, [wallet]);

  const disconnect = React.useCallback(async () => {
    if (wallet) {
      try {
        await wallet.disconnect();
        setPublicKey(null);
        setConnected(false);
      } catch (error) {
        console.error("Error disconnecting wallet:", error);
        toast.error("Failed to disconnect wallet");
      }
    }
  }, [wallet]);

  return (
    <SolanaWalletContext.Provider
      value={{
        wallet,
        publicKey,
        connected,
        connecting,
        connect,
        disconnect,
      }}
    >
      {children}
    </SolanaWalletContext.Provider>
  );
}

export function useSolanaWallet() {
  const context = React.useContext(SolanaWalletContext);
  if (!context) {
    throw new Error("useSolanaWallet must be used within a SolanaWalletProvider");
  }
  return context;
}