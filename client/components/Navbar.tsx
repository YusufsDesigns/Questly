// app/components/NavBar.tsx
"use client";

import { useState, useEffect } from "react";
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


export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2 bg-black/70 backdrop-blur-3xl" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <h1 className="fantasy-logo">QUESTLY</h1>
        </div>
{/* 
        <nav className="max-sm:hidden md:flex space-x-6">
          <NavLink href="#" label="Home" active />
          <NavLink href="#" label="Quests" />
          <NavLink href="#" label="Marketplace" />
          <NavLink href="#" label="Leaderboard" />
        </nav> */}

        <div className="wallet-container">
            <Wallet>
              <ConnectWallet className={`btn-fantasy text-base ${medievalSharp.className}`}>
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
      </div>
    </motion.header>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  active?: boolean;
}

function NavLink({ href, label, active }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`relative transition-colors duration-300 ${
        active ? "text-primary" : "text-gray-300 hover:text-primary"
      }`}
    >
      {label}
      {active && (
        <motion.span
          layoutId="activeNavIndicator"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </a>
  );
}
