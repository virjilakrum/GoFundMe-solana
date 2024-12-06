import { Campaign, CampaignFormData } from "@/types/campaign";
import { Donor } from "@/types/donation";
import { shortenAddress } from "./solana";
import bs58 from 'bs58';

class CampaignStore {
  private campaigns: Campaign[] = [];
  private donations: Record<string, Donor[]> = {};
  private storage: Storage | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.storage = window.localStorage;
      this.loadFromStorage();
    }
  }

  private loadFromStorage() {
    try {
      const stored = this.storage?.getItem('campaigns');
      const storedDonations = this.storage?.getItem('donations');
      
      if (stored) {
        const parsed = JSON.parse(stored);
        this.campaigns = parsed.map((campaign: any) => ({
          ...campaign,
          createdAt: new Date(campaign.createdAt),
          endDate: new Date(campaign.endDate),
        }));
      }

      if (storedDonations) {
        this.donations = JSON.parse(storedDonations);
        Object.keys(this.donations).forEach(campaignId => {
          this.donations[campaignId] = this.donations[campaignId].map(donor => ({
            ...donor,
            timestamp: new Date(donor.timestamp),
          }));
        });
      }
    } catch (error) {
      console.error('Failed to load from storage:', error);
    }
  }

  private saveToStorage() {
    try {
      this.storage?.setItem('campaigns', JSON.stringify(this.campaigns));
      this.storage?.setItem('donations', JSON.stringify(this.donations));
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  }

  createCampaign(data: CampaignFormData): Campaign {
    if (!window.solana?.publicKey) {
      throw new Error('Wallet not connected');
    }

    const campaign: Campaign = {
      id: bs58.encode(Buffer.from(Math.random().toString())),
      title: data.title,
      description: data.description,
      imageUrl: data.image instanceof File 
        ? URL.createObjectURL(data.image)
        : (data.image instanceof FileList && data.image[0]
          ? URL.createObjectURL(data.image[0])
          : ''),
      goalAmount: Number(data.goalAmount),
      raisedAmount: 0,
      createdAt: new Date(),
      endDate: new Date(Date.now() + Number(data.duration) * 24 * 60 * 60 * 1000),
      category: data.category,
      creatorAddress: window.solana.publicKey.toString(),
      isMatching: data.isMatching,
      matchingRules: data.matchingRules ? {
        ratio: Number(data.matchingRules.ratio),
        maxAmount: Number(data.matchingRules.maxAmount),
      } : undefined,
      status: "active",
    };

    this.campaigns.push(campaign);
    this.donations[campaign.id] = [];
    this.saveToStorage();
    return campaign;
  }

  addDonation(campaignId: string, donor: Donor) {
    const campaign = this.getCampaign(campaignId);
    if (!campaign) return;

    if (!this.donations[campaignId]) {
      this.donations[campaignId] = [];
    }

    this.donations[campaignId].push(donor);
    
    campaign.raisedAmount += donor.amount;
    if (donor.isMatched && campaign.matchingRules) {
      const matchedAmount = Math.min(
        donor.amount * campaign.matchingRules.ratio,
        campaign.matchingRules.maxAmount - campaign.raisedAmount
      );
      campaign.raisedAmount += matchedAmount;
    }

    if (campaign.raisedAmount >= campaign.goalAmount) {
      campaign.status = "completed";
    }

    this.saveToStorage();
  }

  getDonations(campaignId: string): Donor[] {
    return this.donations[campaignId] || [];
  }

  getCampaigns(): Campaign[] {
    return this.campaigns;
  }

  getCampaign(id: string): Campaign | undefined {
    return this.campaigns.find((campaign) => campaign.id === id);
  }

  updateCampaign(id: string, updates: Partial<Campaign>): Campaign | undefined {
    const index = this.campaigns.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.campaigns[index] = { ...this.campaigns[index], ...updates };
      this.saveToStorage();
      return this.campaigns[index];
    }
    return undefined;
  }

  deleteCampaign(id: string): boolean {
    const index = this.campaigns.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.campaigns.splice(index, 1);
      delete this.donations[id];
      this.saveToStorage();
      return true;
    }
    return false;
  }
}

export const campaignStore = new CampaignStore();