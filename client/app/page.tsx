// app/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WalletConnect from "@/components/WalletConnect";
import CharacterSelector from "@/components/character/CharacterSelector";
import Footer from "@/components/Footer";
import MagicParticles from "@/components/MagicParticles";
import FloatingRunes from "@/components/FloatingRunes";
import DragonFlyby from "@/components/DragonFlyby";
import { useAccount } from "wagmi";
import FantasyAudioPlayer from "@/components/FantasyAudioPlayer";

export default function HomePage() {
  const account = useAccount();

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow mt-24">
        <Hero />

        {/* Magical Particles */}
        <MagicParticles />

        {/* Floating Runes */}
        <FloatingRunes />

        {/* Dragon Flyby Animation */}
        <AnimatePresence>
          <DragonFlyby />
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!account.isConnected ? (
            <motion.div
              key="connect"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WalletConnect />
            </motion.div>
          ) : (
            <motion.div
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CharacterSelector />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <FantasyAudioPlayer />

      <Footer />
    </div>
  );
}
