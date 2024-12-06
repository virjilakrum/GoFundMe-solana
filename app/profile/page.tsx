"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Trash2, AlertTriangle } from "lucide-react";
import { ProfileForm } from "@/components/auth/profile-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ProfileFormData } from "@/types/auth";

// Mock initial data - Replace with actual user data fetching
const mockUserData: Partial<ProfileFormData> = {
  username: "web3user",
  email: "user@example.com",
  bio: "Passionate about decentralized crowdfunding and supporting innovative projects.",
  notifications: {
    email: true,
    browser: true,
    donations: true,
    updates: true,
  },
};

export default function ProfilePage() {
  const handleProfileUpdate = async (data: ProfileFormData) => {
    try {
      // Implement profile update logic here
      console.log("Profile update:", data);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Implement account deletion logic here
      console.log("Account deleted");
      toast.success("Account deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete account");
    }
  };

  return (
    <div className="container max-w-4xl space-y-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="font-heading text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </motion.div>

      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div>
            <h2 className="font-heading text-xl font-semibold">
              Personal Information
            </h2>
            <p className="text-sm text-muted-foreground">
              Update your profile information and manage your account settings
            </p>
          </div>
          <ProfileForm
            initialData={mockUserData}
            onSubmit={handleProfileUpdate}
          />
        </motion.div>

        <Separator />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <h2 className="font-heading text-xl font-semibold text-destructive">
              Danger Zone
            </h2>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data
            </p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full sm:w-auto">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Delete Account
                </AlertDialogTitle>
                <AlertDialogDescription className="space-y-2">
                  <p>
                    Are you sure you want to delete your account? This action
                    cannot be undone and will:
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>Delete all your personal information</li>
                    <li>Remove all your campaigns</li>
                    <li>Cancel all active donations</li>
                    <li>Disconnect your wallet</li>
                  </ul>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </motion.div>
      </div>
    </div>
  );
}