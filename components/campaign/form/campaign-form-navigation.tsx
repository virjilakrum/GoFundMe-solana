"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CampaignFormNavigationProps {
  step: number;
  isSubmitting: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export function CampaignFormNavigation({
  step,
  isSubmitting,
  onPrevious,
  onNext,
}: CampaignFormNavigationProps) {
  return (
    <div className="flex justify-between gap-4">
      {step > 1 && (
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
      )}
      <Button
        type={step === 3 ? "submit" : "button"}
        variant={step === 3 ? "gradient" : "default"}
        className={step === 1 ? "ml-auto" : ""}
        onClick={step < 3 ? onNext : undefined}
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {step < 3 ? (
          <>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        ) : (
          "Create Campaign"
        )}
      </Button>
    </div>
  );
}