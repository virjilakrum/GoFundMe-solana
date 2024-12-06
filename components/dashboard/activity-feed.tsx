"use client";

import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface ActivityFeedProps {
  activities: Activity[];
  className?: string;
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "donation":
        return "💰";
      case "campaign_created":
        return "🚀";
      case "campaign_updated":
        return "📝";
      case "matching_enabled":
        return "✨";
      default:
        return "📌";
    }
  };

  return (
    <Card className={cn("h-[600px] overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates from your campaigns</CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto">
        <AnimatePresence mode="popLayout">
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex gap-4 border-b py-4 last:border-0"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-lg">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-medium">{activity.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}