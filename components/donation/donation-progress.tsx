"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { DonationStats, Donor } from "@/types/donation";
import { cn } from "@/lib/utils";

interface DonationProgressProps {
  goalAmount: number;
  raisedAmount: number;
  matchedAmount?: number;
  donationStats: DonationStats;
  className?: string;
}

export function DonationProgress({
  goalAmount,
  raisedAmount,
  matchedAmount = 0,
  donationStats,
  className,
}: DonationProgressProps) {
  const totalAmount = raisedAmount + matchedAmount;
  const progress = (totalAmount / goalAmount) * 100;

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <h3 className="font-heading text-2xl font-semibold">
            {totalAmount.toLocaleString()} USDC
          </h3>
          <p className="text-sm text-muted-foreground">
            of {goalAmount.toLocaleString()} USDC goal
          </p>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{progress.toFixed(1)}% Complete</span>
          <span>{donationStats.totalDonors} Donors</span>
        </div>
      </div>

      {matchedAmount > 0 && (
        <div className="rounded-lg border bg-secondary/10 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Matched Funds</span>
            <span className="font-semibold">
              {matchedAmount.toLocaleString()} USDC
            </span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h4 className="font-heading text-lg font-semibold">Recent Donations</h4>
        <div className="space-y-3">
          {donationStats.recentDonations.map((donor, index) => (
            <motion.div
              key={donor.address + donor.timestamp.toISOString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="font-medium">
                    {truncateAddress(donor.address)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(donor.timestamp, { addSuffix: true })}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-semibold">
                  {donor.amount.toLocaleString()} USDC
                </span>
                {donor.isMatched && (
                  <span className="ml-1 text-sm text-secondary">+Match</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-heading text-lg font-semibold">Top Donors</h4>
        <div className="space-y-2">
          {donationStats.topDonors.map((donor, index) => (
            <div
              key={donor.address}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-semibold">
                  {index + 1}
                </div>
                <span className="font-medium">
                  {truncateAddress(donor.address)}
                </span>
              </div>
              <span className="font-semibold">
                {donor.amount.toLocaleString()} USDC
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}