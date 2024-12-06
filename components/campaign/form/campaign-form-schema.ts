import * as z from "zod";

export const campaignFormSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(100),
  description: z.string().min(100, "Description must be at least 100 characters").max(5000),
  image: z.any().refine((value) => value instanceof FileList || value instanceof File, {
    message: "Please upload an image",
  }),
  goalAmount: z.string().min(1, "Please enter a goal amount"),
  duration: z.string().min(1, "Please enter campaign duration"),
  category: z.string().min(1, "Please select a category"),
  isMatching: z.boolean().default(false),
  matchingRules: z.object({
    ratio: z.string(),
    maxAmount: z.string(),
  }).optional(),
});

export type CampaignFormSchema = z.infer<typeof campaignFormSchema>;

export const categories = [
  "Technology",
  "Creative",
  "Community",
  "Education",
  "Environment",
  "Health",
  "Social Impact",
  "Other",
];