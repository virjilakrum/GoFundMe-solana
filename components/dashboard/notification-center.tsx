"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Notification } from "@/types/dashboard";
import { cn } from "@/lib/utils";

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  className?: string;
}

export function NotificationCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  className,
}: NotificationCenterProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Stay updated with your campaigns</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Badge variant="secondary">{unreadCount} new</Badge>
          )}
          <Button variant="outline" size="sm" onClick={onMarkAllAsRead}>
            Mark all as read
          </Button>
        </div>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-auto">
        <AnimatePresence mode="popLayout">
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={cn(
                "flex items-start gap-4 border-b py-4 last:border-0",
                !notification.read && "bg-muted/50"
              )}
            >
              <div
                className={cn(
                  "mt-1 rounded-full p-2",
                  notification.type === "success" && "bg-secondary/20",
                  notification.type === "warning" && "bg-yellow-500/20",
                  notification.type === "error" && "bg-destructive/20",
                  notification.type === "info" && "bg-primary/20"
                )}
              >
                <Bell className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium">{notification.title}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto px-2 py-1 text-xs"
                    onClick={() => onMarkAsRead(notification.id)}
                  >
                    {notification.read ? "Read" : "Mark as read"}
                  </Button>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {notification.message}
                </p>
                <span className="mt-2 text-xs text-muted-foreground">
                  {notification.timestamp.toLocaleString()}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}