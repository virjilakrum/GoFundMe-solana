export interface Campaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  goalAmount: number;
  raisedAmount: number;
  createdAt: Date;
  endDate: Date;
  category: string;
  creatorAddress: string;
  isMatching: boolean;
  matchingRules?: {
    ratio: number;
    maxAmount: number;
  };
  status: 'active' | 'completed' | 'expired';
}

export interface CampaignFormData {
  title: string;
  description: string;
  image: File | FileList;
  goalAmount: number | string;
  duration: number | string;
  category: string;
  isMatching: boolean;
  matchingRules?: {
    ratio: number | string;
    maxAmount: number | string;
  };
}