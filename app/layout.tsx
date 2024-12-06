import { Inter as FontSans, Outfit as FontHeading } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SolanaWalletProvider } from "@/contexts/solana-wallet-context";
import { Toaster } from "@/components/ui/sonner";
import { MainLayout } from "@/components/layout/main-layout";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = FontHeading({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata = {
  title: "Web3 GoFundMe",
  description: "Decentralized crowdfunding platform built on Web3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontHeading.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SolanaWalletProvider>
            <MainLayout>{children}</MainLayout>
            <Toaster />
          </SolanaWalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}