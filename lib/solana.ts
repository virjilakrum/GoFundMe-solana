import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  TransactionInstruction,
  sendAndConfirmTransaction,
  Keypair,
} from '@solana/web3.js';
import { 
  TOKEN_PROGRAM_ID,
  createMint,
  createAssociatedTokenAccount,
  mintTo,
  getAssociatedTokenAddress,
} from '@solana/spl-token';
import {
  Metaplex,
  bundlrStorage,
  walletAdapterIdentity,
} from '@metaplex-foundation/js';
import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import bs58 from 'bs58';
import { toast } from 'sonner';

// Constants
export const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
export const SOLANA_RPC_URL = SOLANA_NETWORK === 'mainnet-beta'
  ? 'https://api.mainnet-beta.solana.com'
  : 'https://api.devnet.solana.com';

// Initialize connection
export const connection = new Connection(SOLANA_RPC_URL, 'confirmed');

// Campaign Program ID (replace with your actual program ID)
export const CAMPAIGN_PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_CAMPAIGN_PROGRAM_ID || ''
);

// Utility Functions
export function getProvider(wallet: any): AnchorProvider {
  return new AnchorProvider(
    connection,
    wallet,
    { commitment: 'confirmed' }
  );
}

export async function getCampaignPDA(
  campaignId: string,
  programId: PublicKey = CAMPAIGN_PROGRAM_ID
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress(
    [Buffer.from('campaign'), Buffer.from(campaignId)],
    programId
  );
}

export async function getDonationPDA(
  campaignId: string,
  donorAddress: PublicKey,
  programId: PublicKey = CAMPAIGN_PROGRAM_ID
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress(
    [
      Buffer.from('donation'),
      Buffer.from(campaignId),
      donorAddress.toBuffer(),
    ],
    programId
  );
}

// Campaign Creation
export async function createCampaignTransaction(
  wallet: any,
  campaignId: string,
  data: {
    title: string;
    description: string;
    goalAmount: number;
    imageUrl: string;
    duration: number;
  }
): Promise<string> {
  try {
    if (!wallet.publicKey) throw new Error('Wallet not connected');

    const [campaignPDA] = await getCampaignPDA(campaignId);
    const provider = getProvider(wallet);
    const program = new Program(CAMPAIGN_PROGRAM_ID, provider);

    const tx = await program.methods
      .createCampaign(
        campaignId,
        data.title,
        data.description,
        new web3.BN(data.goalAmount * LAMPORTS_PER_SOL),
        data.imageUrl,
        new web3.BN(data.duration * 24 * 60 * 60) // Convert days to seconds
      )
      .accounts({
        campaign: campaignPDA,
        creator: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    return tx;
  } catch (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }
}

// Donation Functions
export async function donateToCampaign(
  wallet: any,
  campaignId: string,
  amount: number
): Promise<string> {
  try {
    if (!wallet.publicKey) throw new Error('Wallet not connected');

    const [campaignPDA] = await getCampaignPDA(campaignId);
    const [donationPDA] = await getDonationPDA(campaignId, wallet.publicKey);
    
    const provider = getProvider(wallet);
    const program = new Program(CAMPAIGN_PROGRAM_ID, provider);

    const tx = await program.methods
      .donate(new web3.BN(amount * LAMPORTS_PER_SOL))
      .accounts({
        campaign: campaignPDA,
        donation: donationPDA,
        donor: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    return tx;
  } catch (error) {
    console.error('Error donating to campaign:', error);
    throw error;
  }
}

// Token Functions
export async function createCampaignToken(
  wallet: any,
  campaignId: string,
  tokenMetadata: {
    name: string;
    symbol: string;
    uri: string;
  }
): Promise<PublicKey> {
  try {
    if (!wallet.publicKey) throw new Error('Wallet not connected');

    const metaplex = Metaplex.make(connection)
      .use(walletAdapterIdentity(wallet))
      .use(bundlrStorage());

    // Create mint account
    const mintKeypair = Keypair.generate();
    const mint = await createMint(
      connection,
      wallet,
      wallet.publicKey,
      wallet.publicKey,
      9,
      mintKeypair
    );

    // Create metadata
    await metaplex.nfts().create({
      uri: tokenMetadata.uri,
      name: tokenMetadata.name,
      symbol: tokenMetadata.symbol,
      sellerFeeBasisPoints: 0,
      creators: [{ address: wallet.publicKey, share: 100 }],
      isMutable: true,
      mintAddress: mint,
    });

    return mint;
  } catch (error) {
    console.error('Error creating campaign token:', error);
    throw error;
  }
}

// Utility Functions
export function shortenAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function lamportsToSol(lamports: number): number {
  return lamports / LAMPORTS_PER_SOL;
}

export function solToLamports(sol: number): number {
  return sol * LAMPORTS_PER_SOL;
}

// Transaction Helpers
export async function signAndSendTransaction(
  wallet: any,
  transaction: Transaction,
  signers: Keypair[] = []
): Promise<string> {
  try {
    if (!wallet.publicKey) throw new Error('Wallet not connected');

    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    transaction.feePayer = wallet.publicKey;

    if (signers.length > 0) {
      transaction.sign(...signers);
    }

    const signed = await wallet.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(signature);

    return signature;
  } catch (error) {
    console.error('Error signing and sending transaction:', error);
    throw error;
  }
}

// Error Handling
export function handleSolanaError(error: any): string {
  if (typeof error === 'object' && error !== null) {
    if ('message' in error) return error.message;
    if ('errorMessage' in error) return error.errorMessage;
    if ('msg' in error) return error.msg;
  }
  return 'An unknown error occurred';
}

// Balance Helpers
export async function getBalance(address: PublicKey): Promise<number> {
  try {
    const balance = await connection.getBalance(address);
    return lamportsToSol(balance);
  } catch (error) {
    console.error('Error getting balance:', error);
    throw error;
  }
}

export async function getTokenBalance(
  address: PublicKey,
  mint: PublicKey
): Promise<number> {
  try {
    const tokenAccount = await getAssociatedTokenAddress(mint, address);
    const balance = await connection.getTokenAccountBalance(tokenAccount);
    return Number(balance.value.uiAmount);
  } catch (error) {
    console.error('Error getting token balance:', error);
    throw error;
  }
}

// Campaign Data Fetching
export async function fetchCampaignData(campaignId: string) {
  try {
    const [campaignPDA] = await getCampaignPDA(campaignId);
    const provider = getProvider(window.solana);
    const program = new Program(CAMPAIGN_PROGRAM_ID, provider);

    const campaignData = await program.account.campaign.fetch(campaignPDA);
    return campaignData;
  } catch (error) {
    console.error('Error fetching campaign data:', error);
    throw error;
  }
}

export async function fetchCampaignDonations(campaignId: string) {
  try {
    const provider = getProvider(window.solana);
    const program = new Program(CAMPAIGN_PROGRAM_ID, provider);

    const donations = await program.account.donation.all([
      {
        memcmp: {
          offset: 8, // Adjust based on your account structure
          bytes: bs58.encode(Buffer.from(campaignId)),
        },
      },
    ]);

    return donations;
  } catch (error) {
    console.error('Error fetching campaign donations:', error);
    throw error;
  }
}