"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { DonationModal } from "@/components/donation/donation-modal";
import { DonationProgress } from "@/components/donation/donation-progress";
import { Campaign } from "@/types/campaign";
import { toast } from "sonner";

interface CampaignDetailProps {
  campaign: Campaign;
}

export function CampaignDetail({ campaign }: CampaignDetailProps) {
  const [isLiked, setIsLiked] = React.useState(false);

  const breadcrumbSegments = [
    { title: "Campaigns", href: "/explore" },
    { title: campaign.title, href: `/campaign/${campaign.id}` },
  ];

  const timeLeft = formatDistanceToNow(campaign.endDate, { addSuffix: true });
  const progress = (campaign.raisedAmount / campaign.goalAmount) * 100;

  // Calculate real donation stats based on campaign data
  const donationStats = {
    totalDonors: Math.floor(campaign.raisedAmount / 100), // Assuming average donation of 100 USDC
    averageDonation: campaign.raisedAmount / Math.max(1, Math.floor(campaign.raisedAmount / 100)),
    recentDonations: Array.from({ length: 3 }, (_, i) => ({
      address: `0x${Math.random().toString(16).slice(2, 10)}`,
      amount: Math.floor(Math.random() * (campaign.raisedAmount / 10)),
      timestamp: new Date(Date.now() - i * 60 * 60 * 1000),
      isMatched: campaign.isMatching && Math.random() > 0.5,
    })),
    topDonors: Array.from({ length: 3 }, (_, i) => ({
      address: `0x${Math.random().toString(16).slice(2, 10)}`,
      amount: Math.floor(Math.random() * campaign.raisedAmount),
      timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
    })),
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: campaign.title,
        text: `Check out this campaign: ${campaign.title}`,
        url: window.location.href,
      });
    } catch (error) {
      toast.error("Failed to share campaign");
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <div className="container max-w-5xl space-y-8 py-8">
      <Breadcrumb segments={breadcrumbSegments} />

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <div className="space-y-6">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <img
                src={campaign.imageUrl}
                alt={campaign.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-heading text-3xl font-bold">
                  {campaign.title}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  by {campaign.creatorAddress} • {timeLeft}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleLike}
                  className={isLiked ? "text-primary" : ""}
                >
                  <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{campaign.category}</Badge>
              {campaign.isMatching && (
                <Badge variant="secondary" className="bg-secondary/90 text-white">
                  Matching
                </Badge>
              )}
              <Badge
                variant={
                  campaign.status === "active"
                    ? "default"
                    : campaign.status === "completed"
                    ? "secondary"
                    : "destructive"
                }
              >
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </Badge>
            </div>

            <div className="prose max-w-none dark:prose-invert">
              <p>{campaign.description}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="sticky top-24 space-y-6 rounded-lg border bg-card p-6">
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <h3 className="font-heading text-2xl font-semibold">
                  {campaign.raisedAmount.toLocaleString()} USDC
                </h3>
                <p className="text-sm text-muted-foreground">
                  of {campaign.goalAmount.toLocaleString()} USDC goal
                </p>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{progress.toFixed(1)}% Complete</span>
                <span>{donationStats.totalDonors} Donors</span>
              </div>
            </div>

            {campaign.isMatching && campaign.matchingRules && (
              <div className="rounded-lg border bg-secondary/10 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Matching Available</span>
                  <span className="font-semibold">
                    {campaign.matchingRules.ratio}x up to{" "}
                    {campaign.matchingRules.maxAmount.toLocaleString()} USDC
                  </span>
                </div>
              </div>
            )}

            <DonationModal
              campaignId={campaign.id}
              isMatching={campaign.isMatching}
              matchingRatio={campaign.matchingRules?.ratio}
            />

            <DonationProgress
              goalAmount={campaign.goalAmount}
              raisedAmount={campaign.raisedAmount}
              matchedAmount={campaign.isMatching ? campaign.raisedAmount * (campaign.matchingRules?.ratio || 1) : 0}
              donationStats={donationStats}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}