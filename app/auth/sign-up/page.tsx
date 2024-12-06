"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { Button } from "@/components/ui/button";
import { SignUpFormData } from "@/types/auth";

export default function SignUpPage() {
  const handleSignUp = async (data: SignUpFormData) => {
    // Implement sign up logic here
    console.log(data);
  };

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-primary/90" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/">Web3 Fund</Link>
        </div>
        <motion.div
          className="relative z-20 mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Join our community of innovators and creators. Start your
              crowdfunding journey today with Web3 Fund."
            </p>
          </blockquote>
        </motion.div>
      </div>
      <div className="p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>
          <SignUpForm onSubmit={handleSignUp} />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button variant="link" className="px-2" asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}