"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Wallet, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useSolanaWallet } from "@/contexts/solana-wallet-context";
import { campaignStore } from "@/lib/store";
import { donateToCampaign } from "@/lib/solana";
import { DonationFormData } from "@/types/donation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const formSchema = z.object({
  amount: z.number().min(1),
  message: z.string().max(500).optional(),
  isAnonymous: z.boolean().default(false),
});

const predefinedAmounts = [
  { value: 10, label: "$10" },
  { value: 25, label: "$25" },
  { value: 50, label: "$50" },
  { value: 100, label: "$100" },
];

interface DonationModalProps {
  campaignId: string;
  isMatching?: boolean;
  matchingRatio?: number;
}

export function DonationModal({
  campaignId,
  isMatching,
  matchingRatio = 1,
}: DonationModalProps) {
  const { connected, connecting, connect } = useSolanaWallet();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [step, setStep] = React.useState<"connect" | "amount" | "success">(
    connected ? "amount" : "connect"
  );

  const form = useForm<DonationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isAnonymous: false,
    },
  });

  const handleConnect = async () => {
    try {
      await connect();
      setStep("amount");
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect wallet");
    }
  };

  const onSubmit = async (data: DonationFormData) => {
    if (!connected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsSubmitting(true);
    try {
      const signature = await donateToCampaign(window.solana, campaignId, data.amount);
      
      campaignStore.addDonation(campaignId, {
        address: window.solana.publicKey.toString(),
        amount: data.amount,
        timestamp: new Date(),
        message: data.message,
        isMatched: isMatching,
        transactionHash: signature,
      });

      setStep("success");
      toast.success("Donation successful!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to process donation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const matchedAmount = form.watch("amount")
    ? form.watch("amount") * matchingRatio
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient" size="lg">
          Donate Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make a Donation</DialogTitle>
          <DialogDescription>
            Support this campaign with a secure donation.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === "connect" && (
            <motion.div
              key="connect"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-6 py-6"
            >
              <Wallet className="h-12 w-12 text-muted-foreground" />
              <div className="text-center">
                <h3 className="font-heading text-lg font-semibold">
                  Connect Your Wallet
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Connect your wallet to make a secure donation
                </p>
              </div>
              <Button
                variant="gradient"
                className="w-full"
                onClick={handleConnect}
                disabled={connecting}
              >
                {connecting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Connect Wallet
              </Button>
            </motion.div>
          )}

          {step === "amount" && (
            <motion.div
              key="amount"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-4"
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Donation Amount (USDC)</FormLabel>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {predefinedAmounts.map((amount) => (
                            <Button
                              key={amount.value}
                              type="button"
                              variant="outline"
                              className={cn(
                                "w-full",
                                value === amount.value &&
                                  "border-primary bg-primary/10"
                              )}
                              onClick={() => onChange(amount.value)}
                            >
                              {amount.label}
                            </Button>
                          ))}
                        </div>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Custom amount"
                            onChange={(e) =>
                              onChange(parseFloat(e.target.value))
                            }
                            value={value}
                            {...field}
                          />
                        </FormControl>
                        {isMatching && value && (
                          <FormDescription>
                            +{matchedAmount.toFixed(2)} USDC matched
                          </FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Leave a message of support"
                            className="h-20 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isAnonymous"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Donate Anonymously</FormLabel>
                          <FormDescription>
                            Hide your identity from public view
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    variant="gradient"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Confirm Donation
                  </Button>
                </form>
              </Form>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-6 py-6 text-center"
            >
              <div className="rounded-full bg-secondary/20 p-3">
                <div className="rounded-full bg-secondary/40 p-2">
                  <Check className="h-6 w-6 text-secondary" />
                </div>
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold">
                  Thank You for Your Support!
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your donation has been processed successfully.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </Button>
                <Button
                  variant="gradient"
                  className="w-full"
                  onClick={() => {
                    // Implement share functionality
                  }}
                >
                  Share
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}