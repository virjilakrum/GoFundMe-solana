"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-16rem)] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl space-y-6"
      >
        <h1 className="font-heading text-4xl font-bold sm:text-5xl md:text-6xl">
          Decentralized Crowdfunding for{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Everyone
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Launch your campaign, support innovative projects, and be part of the
          future of crowdfunding with Web3 technology.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" variant="gradient">
            <Link href="/campaign/new">Start a Campaign</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/explore">Explore Campaigns</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}