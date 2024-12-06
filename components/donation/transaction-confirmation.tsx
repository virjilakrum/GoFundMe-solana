"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Copy, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

interface TransactionConfirmationProps {
  transactionHash: string;
  amount: number;
  timestamp: Date;
  campaignId: string;
  campaignTitle: string;
}

export function TransactionConfirmation({
  transactionHash,
  amount,
  timestamp,
  campaignId,
  campaignTitle,
}: TransactionConfirmationProps) {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopyHash = async () => {
    try {
      await navigator.clipboard.writeText(transactionHash);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast.success("Transaction hash copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy transaction hash");
    }
  };

  const handleDownloadReceipt = () => {
    // Implement receipt download logic here
    toast.success("Receipt downloaded successfully");
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `Donation to ${campaignTitle}`,
        text: `I just donated ${amount} USDC to support this campaign!`,
        url: `https://yourplatform.com/campaign/${campaignId}`,
      });
    } catch (error) {
      toast.error("Failed to share");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20">
            <Check className="h-6 w-6 text-secondary" />
          </div>
          <CardTitle>Transaction Successful</CardTitle>
          <CardDescription>
            Your donation has been processed successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">{amount} USDC</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">
                  {timestamp.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transaction Hash</span>
                <button
                  onClick={handleCopyHash}
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  {truncateHash(transactionHash)}
                  {isCopied ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <div className="grid w-full grid-cols-2 gap-2">
            <Button variant="outline" onClick={handleDownloadReceipt}>
              <Download className="mr-2 h-4 w-4" />
              Receipt
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
          <Link href={`/campaign/${campaignId}`} className="w-full">
            <Button variant="gradient" className="w-full">
              Return to Campaign
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function truncateHash(hash: string): string {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}