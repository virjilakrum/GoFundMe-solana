"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CampaignFormSchema } from "./campaign-form-schema";

interface CampaignFormStepThreeProps {
  form: UseFormReturn<CampaignFormSchema>;
}

export function CampaignFormStepThree({ form }: CampaignFormStepThreeProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="isMatching"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Enable Matching</FormLabel>
              <FormDescription>
                Activate matching contributions for your campaign
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {form.watch("isMatching") && (
        <>
          <FormField
            control={form.control}
            name="matchingRules.ratio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matching Ratio</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="5"
                    placeholder="Enter matching ratio"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Set the ratio for matching contributions (e.g., 1.5 means 1.5x
                  match)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="matchingRules.maxAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Matching Amount (USDC)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="100"
                    step="100"
                    placeholder="Enter maximum matching amount"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Set the maximum amount for matching in USDC
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
}