"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import { LoginFormData } from "@/types/auth";

export default function LoginPage() {
  const handleLogin = async (data: LoginFormData) => {
    // Implement login logic here
    console.log(data);
  };

  const handleForgotPassword = () => {
    // Implement forgot password logic here
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
              "Welcome back to Web3 Fund. Continue your journey in decentralized
              crowdfunding."
            </p>
          </blockquote>
        </motion.div>
      </div>
      <div className="p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>
          <LoginForm
            onSubmit={handleLogin}
            onForgotPassword={handleForgotPassword}
          />
          <p className="px-8 text-center text-sm text-muted-foreground">
            New to Web3 Fund?{" "}
            <Button variant="link" className="px-2" asChild>
              <Link href="/auth/sign-up">Create an account</Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}