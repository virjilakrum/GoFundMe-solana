import { Campaign, CampaignFormData } from "@/types/campaign";

// Mock database
let campaigns: Campaign[] = [];

export async function createCampaign(data: CampaignFormData): Promise<Campaign> {
  const campaign: Campaign = {
    id: Math.random().toString(36).slice(2),
    title: data.title,
    description: data.description,
    imageUrl: URL.createObjectURL(data.image[0]),
    goalAmount: data.goalAmount,
    raisedAmount: 0,
    createdAt: new Date(),
    endDate: new Date(Date.now() + data.duration * 24 * 60 * 60 * 1000),
    category: data.category,
    creatorAddress: "0x1234...5678", // Replace with actual wallet address
    isMatching: data.isMatching,
    matchingRules: data.matchingRules,
    status: "active",
  };

  campaigns.push(campaign);
  return campaign;
}

export async function getCampaigns(): Promise<Campaign[]> {
  return campaigns;
}

export async function getCampaign(id: string): Promise<Campaign | undefined> {
  return campaigns.find((campaign) => campaign.id === id);
}