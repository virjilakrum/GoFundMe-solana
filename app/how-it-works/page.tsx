"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const steps = [
  {
    title: "Connect Your Wallet",
    description:
      "Start by connecting your Web3 wallet. We support multiple wallets including MetaMask, WalletConnect, and more.",
  },
  {
    title: "Create Your Campaign",
    description:
      "Set up your campaign by providing details, setting your funding goal, and adding media to showcase your project.",
  },
  {
    title: "Share & Promote",
    description:
      "Share your campaign with your network and leverage our platform's reach to attract potential donors.",
  },
  {
    title: "Receive Funds",
    description:
      "When your campaign reaches its goal, receive funds directly to your wallet through our secure smart contract.",
  },
];

const features = [
  "Decentralized and transparent fundraising",
  "Smart contract-based fund distribution",
  "Optional matching fund pools",
  "Real-time tracking and analytics",
  "Community engagement tools",
  "Multi-wallet support",
];

export default function HowItWorksPage() {
  return (
    <div className="container space-y-16 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-heading text-4xl font-bold sm:text-5xl">
          How Web3 Fund Works
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Our platform combines the power of blockchain technology with traditional
          crowdfunding to create a transparent and efficient fundraising experience.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative rounded-lg border bg-card p-6"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold">
              {index + 1}
            </div>
            <h3 className="mb-2 font-heading text-xl font-semibold">
              {step.title}
            </h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h2 className="font-heading text-3xl font-bold">Key Features</h2>
          <div className="space-y-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <div className="rounded-full bg-secondary/20 p-1">
                  <Check className="h-4 w-4 text-secondary" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h2 className="font-heading text-3xl font-bold">Why Choose Us?</h2>
          <p className="text-muted-foreground">
            Web3 Fund revolutionizes crowdfunding by leveraging blockchain
            technology to create a transparent, secure, and efficient platform for
            both creators and donors.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• 100% transparent fund management</li>
            <li>• Lower fees compared to traditional platforms</li>
            <li>• Instant fund distribution</li>
            <li>• Global accessibility</li>
            <li>• Community-driven ecosystem</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}