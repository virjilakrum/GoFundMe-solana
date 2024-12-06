"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Share2, Heart, ChevronDown, ChevronUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DonationModal } from "@/components/donation/donation-modal";
import { DonationProgress } from "@/components/donation/donation-progress";
import { Campaign } from "@/types/campaign";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CampaignCardProps {
  campaign: Campaign;
  className?: string;
}

export function CampaignCard({ campaign, className }: CampaignCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);

  const progress = (campaign.raisedAmount / campaign.goalAmount) * 100;
  const timeLeft = formatDistanceToNow(campaign.endDate, { addSuffix: true });

  const donationStats = {
    totalDonors: Math.floor(campaign.raisedAmount / 100),
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
    <motion.div
      layout
      className={cn("group relative overflow-hidden rounded-lg", className)}
    >
      <div className="gradient-border">
        <div className="h-full w-full overflow-hidden rounded-lg bg-background p-4">
          <div className="relative aspect-video overflow-hidden rounded-md">
            <Image
              src={campaign.imageUrl}
              alt={campaign.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute right-2 top-2 flex gap-2">
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
                className="bg-opacity-90"
              >
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </Badge>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-start justify-between">
              <h3 className="font-heading text-lg font-semibold leading-tight">
                {campaign.title}
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleLike}
                >
                  <Heart
                    className="h-4 w-4"
                    fill={isLiked ? "currentColor" : "none"}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-4">
              <Progress value={progress} className="h-2" />
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="font-medium">
                  {campaign.raisedAmount.toLocaleString()} USDC
                </span>
                <span className="text-muted-foreground">
                  {progress.toFixed(0)}% of {campaign.goalAmount.toLocaleString()} USDC
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{timeLeft}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="gap-2"
              >
                {isExpanded ? (
                  <>
                    Show Less
                    <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    View Details
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 space-y-6 border-t pt-6">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <p>{campaign.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{campaign.category}</Badge>
                      <Badge variant="outline">
                        by {campaign.creatorAddress}
                      </Badge>
                    </div>

                    {campaign.isMatching && campaign.matchingRules && (
                      <div className="rounded-lg border bg-secondary/10 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            Matching Available
                          </span>
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
                      matchedAmount={
                        campaign.isMatching
                          ? campaign.raisedAmount * (campaign.matchingRules?.ratio || 1)
                          : 0
                      }
                      donationStats={donationStats}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}