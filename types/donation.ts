export interface DonationAmount {
  value: number;
  label: string;
}

export interface Donor {
  address: string;
  amount: number;
  timestamp: Date;
  message?: string;
  isMatched?: boolean;
  transactionHash: string;
}

export interface DonationStats {
  totalDonors: number;
  averageDonation: number;
  recentDonations: Donor[];
  topDonors: Donor[];
}

export interface DonationFormData {
  amount: number;
  message?: string;
  isAnonymous?: boolean;
}