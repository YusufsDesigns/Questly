// app/components/WalletConnect.tsx
"use client";

import { motion } from "framer-motion";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';
import { MedievalSharp } from "next/font/google";

const medievalSharp = MedievalSharp({
  weight: "400",
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function WalletConnect() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="glass-panel p-8 max-w-md mx-auto flex items-center flex-col text-center"
    >
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="fantasy-subtitle mb-4">Connect Your Wallet</h2>
        <p className="text-gray-300 mb-6">
          Connect your wallet to start your epic adventure. Your NFT character
          awaits!
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="wallet-container">
          <Wallet>
            <ConnectWallet
              className={`btn-fantasy text-base ${medievalSharp.className}`}
            >
              <Avatar className="h-6 w-6" />
              <Name className="text-[#b8860b]" />
            </ConnectWallet>
            <WalletDropdown className="">
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownLink
                icon="wallet"
                href="https://keys.coinbase.com"
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                Wallet
              </WalletDropdownLink>
              <WalletDropdownDisconnect className="" />
            </WalletDropdown>
          </Wallet>
        </div>
      </motion.div>
    </motion.div>
  );
}
