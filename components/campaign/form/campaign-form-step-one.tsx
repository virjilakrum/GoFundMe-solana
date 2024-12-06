"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { Image as ImageIcon } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CampaignFormSchema } from "./campaign-form-schema";

interface CampaignFormStepOneProps {
  form: UseFormReturn<CampaignFormSchema>;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl?: string;
}

export function CampaignFormStepOne({
  form,
  onImageChange,
  previewUrl,
}: CampaignFormStepOneProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Campaign Title</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter your campaign title" />
            </FormControl>
            <FormDescription>Make it clear and compelling</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Campaign Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Describe your campaign"
                className="h-32"
              />
            </FormControl>
            <FormDescription>
              Tell your story and explain why people should support you
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="image"
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <FormLabel>Campaign Image</FormLabel>
            <FormControl>
              <div className="flex flex-col gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    onImageChange(e);
                    onChange(e.target.files?.[0]);
                  }}
                  {...field}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition-colors hover:border-muted-foreground/50"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-48 rounded-lg object-cover"
                    />
                  ) : (
                    <>
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload campaign image
                      </span>
                    </>
                  )}
                </label>
              </div>
            </FormControl>
            <FormDescription>
              Upload a compelling image that represents your campaign
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}