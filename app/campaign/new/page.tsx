"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CampaignForm } from "@/components/campaign/campaign-form";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { toast } from "sonner";
import { CampaignFormData } from "@/types/campaign";
import { campaignStore } from "@/lib/store";

export default function NewCampaignPage() {
  const router = useRouter();
  const breadcrumbSegments = [
    { title: "Campaigns", href: "/explore" },
    { title: "New Campaign", href: "/campaign/new" },
  ];

  const handleSubmit = async (data: CampaignFormData) => {
    try {
      const campaign = campaignStore.createCampaign(data);
      toast.success("Campaign created successfully!");
      router.push(`/campaign/${campaign.id}`);
    } catch (error) {
      console.error("Failed to create campaign:", error);
      toast.error("Failed to create campaign");
    }
  };

  return (
    <div className="container max-w-3xl space-y-8 py-8">
      <Breadcrumb segments={breadcrumbSegments} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="font-heading text-3xl font-bold">Create a Campaign</h1>
        <p className="text-muted-foreground">
          Launch your crowdfunding campaign and start raising funds
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="rounded-lg border bg-card p-6">
          <CampaignForm onSubmit={handleSubmit} />
        </div>
      </motion.div>
    </div>
  );
}