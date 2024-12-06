"use client";

import * as React from "react";
import { useInView } from "react-intersection-observer";
import { Grid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CampaignCard } from "./campaign-card";
import { Campaign } from "@/types/campaign";
import { cn } from "@/lib/utils";

interface CampaignGridProps {
  initialCampaigns: Campaign[];
  className?: string;
}

export function CampaignGrid({ initialCampaigns, className }: CampaignGridProps) {
  const [campaigns, setCampaigns] = React.useState(initialCampaigns);
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = React.useState(false);
  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView) {
      loadMoreCampaigns();
    }
  }, [inView]);

  const loadMoreCampaigns = async () => {
    setIsLoading(true);
    // Implement pagination logic here
    setIsLoading(false);
  };

  return (
    <div className={className}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="raised">Most Raised</SelectItem>
              <SelectItem value="goal">Highest Goal</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setView("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "grid gap-6",
          view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}
      >
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            className={cn(view === "list" && "max-w-none")}
          />
        ))}
      </div>

      <div ref={ref} className="mt-8 flex justify-center">
        {isLoading && (
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        )}
      </div>
    </div>
  );
}