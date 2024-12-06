export interface DashboardStats {
  totalRaised: number;
  totalCampaigns: number;
  activeCampaigns: number;
  totalDonors: number;
  matchedFunds: number;
  successRate: number;
}

export interface Activity {
  id: string;
  type: 'donation' | 'campaign_created' | 'campaign_updated' | 'matching_enabled';
  title: string;
  description: string;
  timestamp: Date;
  amount?: number;
  campaignId?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

export interface UserProfile {
  address: string;
  username?: string;
  bio?: string;
  avatar?: string;
  email?: string;
  notifications: {
    email: boolean;
    browser: boolean;
    donations: boolean;
    updates: boolean;
  };
}