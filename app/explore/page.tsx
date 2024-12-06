"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CampaignGrid } from "@/components/campaign/campaign-grid";
import { campaignStore } from "@/lib/store";

export default function ExplorePage() {
  const campaigns = campaignStore.getCampaigns();

  return (
    <div className="container space-y-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="font-heading text-3xl font-bold">Explore Campaigns</h1>
        <p className="text-muted-foreground">
          Discover and support innovative projects from around the world
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <CampaignGrid initialCampaigns={campaigns} />
      </motion.div>
    </div>
  );
}