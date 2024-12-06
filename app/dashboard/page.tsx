"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { NotificationCenter } from "@/components/dashboard/notification-center";
import { CampaignList } from "@/components/dashboard/campaign-list";

// Mock data - Replace with actual data fetching
const mockStats = {
  totalRaised: 150000,
  totalCampaigns: 45,
  activeCampaigns: 12,
  totalDonors: 850,
  matchedFunds: 50000,
  successRate: 78,
};

const mockChartData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  amount: Math.floor(Math.random() * 10000),
  donations: Math.floor(Math.random() * 50),
}));

const mockActivities = Array.from({ length: 10 }, (_, i) => ({
  id: `activity-${i}`,
  type: ["donation", "campaign_created", "campaign_updated", "matching_enabled"][
    Math.floor(Math.random() * 4)
  ] as any,
  title: `Activity ${i + 1}`,
  description: `Description for activity ${i + 1}`,
  timestamp: new Date(Date.now() - i * 60 * 60 * 1000),
}));

const mockNotifications = Array.from({ length: 5 }, (_, i) => ({
  id: `notification-${i}`,
  title: `Notification ${i + 1}`,
  message: `Message for notification ${i + 1}`,
  type: ["info", "success", "warning", "error"][Math.floor(Math.random() * 4)] as any,
  timestamp: new Date(Date.now() - i * 60 * 60 * 1000),
  read: Math.random() > 0.5,
}));

const mockCampaigns = Array.from({ length: 5 }, (_, i) => ({
  id: `campaign-${i}`,
  title: `Campaign ${i + 1}`,
  description: `Description for campaign ${i + 1}`,
  imageUrl: `https://picsum.photos/seed/${i}/400/300`,
  goalAmount: Math.floor(Math.random() * 100000),
  raisedAmount: Math.floor(Math.random() * 50000),
  createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
  endDate: new Date(Date.now() + (30 - i) * 24 * 60 * 60 * 1000),
  category: "Technology",
  creatorAddress: "0x1234...5678",
  isMatching: Math.random() > 0.5,
  status: ["active", "completed", "expired"][Math.floor(Math.random() * 3)] as any,
}));

export default function DashboardPage() {
  const handleMarkAsRead = (id: string) => {
    // Implement mark as read logic
  };

  const handleMarkAllAsRead = () => {
    // Implement mark all as read logic
  };

  const handleEditCampaign = (id: string) => {
    // Implement edit campaign logic
  };

  const handleDeleteCampaign = (id: string) => {
    // Implement delete campaign logic
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-heading text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your campaigns and track performance
        </p>
      </motion.div>

      <StatsCards stats={mockStats} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PerformanceChart
          data={mockChartData}
          className="md:col-span-2 lg:col-span-2"
        />
        <ActivityFeed activities={mockActivities} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <CampaignList
          campaigns={mockCampaigns}
          onEdit={handleEditCampaign}
          onDelete={handleDeleteCampaign}
        />
        <NotificationCenter
          notifications={mockNotifications}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
        />
      </div>
    </div>
  );
}