"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { CampaignFormData } from "@/types/campaign";
import { campaignFormSchema, type CampaignFormSchema } from "./form/campaign-form-schema";
import { CampaignFormStepOne } from "./form/campaign-form-step-one";
import { CampaignFormStepTwo } from "./form/campaign-form-step-two";
import { CampaignFormStepThree } from "./form/campaign-form-step-three";
import { CampaignFormNavigation } from "./form/campaign-form-navigation";

interface CampaignFormProps {
  onSubmit: (data: CampaignFormData) => Promise<void>;
}

export function CampaignForm({ onSubmit }: CampaignFormProps) {
  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState<string>();

  const form = useForm<CampaignFormSchema>({
    resolver: zodResolver(campaignFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      goalAmount: "",
      duration: "",
      category: "",
      isMatching: false,
      matchingRules: {
        ratio: "1",
        maxAmount: "1000",
      },
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      form.setValue("image", file);
    }
  };

  const validateStep = async (currentStep: number) => {
    let isValid = true;
    
    switch (currentStep) {
      case 1:
        isValid = await form.trigger(['title', 'description', 'image']);
        break;
      case 2:
        isValid = await form.trigger(['goalAmount', 'duration', 'category']);
        break;
      case 3:
        if (form.watch('isMatching')) {
          isValid = await form.trigger(['matchingRules.ratio', 'matchingRules.maxAmount']);
        }
        break;
    }

    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateStep(step);
    
    if (isValid) {
      setStep((prev) => prev + 1);
    } else {
      toast.error("Please fill in all required fields correctly");
    }
  };

  const handlePrevious = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (values: CampaignFormSchema) => {
    if (step < 3) {
      await handleNext();
      return;
    }

    const isValid = await validateStep(3);
    if (!isValid) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData: CampaignFormData = {
        ...values,
        goalAmount: Number(values.goalAmount),
        duration: Number(values.duration),
        image: values.image,
        matchingRules: values.isMatching && values.matchingRules ? {
          ratio: Number(values.matchingRules.ratio),
          maxAmount: Number(values.matchingRules.maxAmount),
        } : undefined,
      };
      await onSubmit(formData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create campaign");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <motion.div
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {step === 1 && (
            <CampaignFormStepOne
              form={form}
              onImageChange={handleImageChange}
              previewUrl={previewUrl}
            />
          )}

          {step === 2 && <CampaignFormStepTwo form={form} />}

          {step === 3 && <CampaignFormStepThree form={form} />}
        </motion.div>

        <CampaignFormNavigation
          step={step}
          isSubmitting={isSubmitting}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </form>
    </Form>
  );
}