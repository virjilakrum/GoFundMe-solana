import { CampaignDetail } from "@/components/campaign/campaign-detail";
import { campaignStore } from "@/lib/store";
import { notFound } from "next/navigation";

export const dynamicParams = false;

interface CampaignPageProps {
  params: { id: string };
}

export default function CampaignPage({ params }: CampaignPageProps) {
  const campaign = campaignStore.getCampaign(params.id);

  if (!campaign) {
    notFound();
  }

  return <CampaignDetail campaign={campaign} />;
}

export function generateStaticParams() {
  const campaigns = campaignStore.getCampaigns();
  return campaigns.map((campaign) => ({
    id: campaign.id,
  }));
}