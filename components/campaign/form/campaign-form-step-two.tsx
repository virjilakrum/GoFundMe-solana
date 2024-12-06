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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CampaignFormSchema, categories } from "./campaign-form-schema";

interface CampaignFormStepTwoProps {
  form: UseFormReturn<CampaignFormSchema>;
}

export function CampaignFormStepTwo({ form }: CampaignFormStepTwoProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="goalAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Funding Goal (USDC)</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="100"
                step="100"
                placeholder="Enter funding goal"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Set a realistic funding goal in USDC (minimum 100)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Campaign Duration (Days)</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="1"
                max="90"
                placeholder="Enter campaign duration"
                {...field}
              />
            </FormControl>
            <FormDescription>Choose between 1 to 90 days</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category.toLowerCase()}
                    value={category.toLowerCase()}
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Choose the category that best fits your campaign
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}