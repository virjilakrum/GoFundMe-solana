import { useCallback, useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

export function useSolanaWallet() {
  const [wallet, setWallet] = useState<any>(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const solana = (window as any).solana;
      if (solana?.isPhantom) {
        setWallet(solana);
      }
    }
  }, []);

  const connect = useCallback(async () => {
    if (wallet) {
      try {
        setConnecting(true);
        const { publicKey } = await wallet.connect();
        setConnected(true);
        return publicKey;
      } catch (error) {
        console.error('Error connecting wallet:', error);
        throw error;
      } finally {
        setConnecting(false);
      }
    }
  }, [wallet]);

  const disconnect = useCallback(async () => {
    if (wallet) {
      await wallet.disconnect();
      setConnected(false);
    }
  }, [wallet]);

  return {
    wallet,
    connected,
    connecting,
    connect,
    disconnect,
  };
}