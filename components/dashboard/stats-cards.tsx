"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Target,
  Activity,
  Sparkles,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "@/types/dashboard";

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: "Total Raised",
      value: `${stats.totalRaised.toLocaleString()} USDC`,
      description: "Total funds raised across all campaigns",
      icon: TrendingUp,
      color: "primary",
    },
    {
      title: "Active Campaigns",
      value: stats.activeCampaigns.toString(),
      description: "Currently running campaigns",
      icon: Target,
      color: "secondary",
    },
    {
      title: "Total Donors",
      value: stats.totalDonors.toLocaleString(),
      description: "Unique donors across all campaigns",
      icon: Users,
      color: "primary",
    },
    {
      title: "Matched Funds",
      value: `${stats.matchedFunds.toLocaleString()} USDC`,
      description: "Total matched contributions",
      icon: Sparkles,
      color: "secondary",
    },
    {
      title: "Success Rate",
      value: `${stats.successRate}%`,
      description: "Campaigns reaching their goal",
      icon: Activity,
      color: "primary",
    },
    {
      title: "Total Campaigns",
      value: stats.totalCampaigns.toString(),
      description: "All-time campaigns created",
      icon: BarChart3,
      color: "secondary",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="gradient-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon
                className={`h-4 w-4 text-${card.color}`}
                aria-hidden="true"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}