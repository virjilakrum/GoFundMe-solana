"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CampaignNotFound() {
  return (
    <div className="flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md space-y-6"
      >
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
        </div>
        <h1 className="font-heading text-3xl font-bold">Campaign Not Found</h1>
        <p className="text-muted-foreground">
          The campaign you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild variant="gradient">
          <Link href="/explore">Browse Campaigns</Link>
        </Button>
      </motion.div>
    </div>
  );
}