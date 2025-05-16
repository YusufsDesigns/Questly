"use client";

import { baseSepolia } from "wagmi/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import type { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/lib/config";

export function Providers(props: { children: ReactNode }) {
  const queryClient = new QueryClient()
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.ONCHAINKIT_API_KEY}
          chain={baseSepolia}
          config={{
            appearance: {
              name: "Questly", // Displayed in modal header
              // logo: 'https://your-logo.com',// Displayed in modal header
              mode: "auto", // 'light' | 'dark' | 'auto'
              theme: "default", // 'default' or custom theme
            },
            wallet: {
              display: "modal",
              termsUrl: "https://...",
              privacyUrl: "https://...",
            },
          }}
        >
          {props.children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
