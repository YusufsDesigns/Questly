"use client";

import QuestPage from "@/components/quest/QuestPage";
import MagicParticles from "@/components/MagicParticles";
import FloatingRunes from "@/components/FloatingRunes";
import { AnimatePresence } from "framer-motion";
import DragonFlyby from "@/components/DragonFlyby";
import { metadataToCharacter } from "@/lib/utils";
import { use, useEffect, useState } from "react";
import { useNFTMetadata } from "@/hooks/useNFTMetadata";
import { Character, Quest } from "@/lib/types";
import { motion } from "framer-motion";
import axios from "axios";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const [character, setCharacter] = useState<Character | null>(null);
  const [quest, setQuest] = useState<Quest | null>(null);
  const { metadata } = useNFTMetadata(BigInt(id));

  useEffect(() => {
    if (!metadata) return;

    const fetchQuest = async () => {
      const character: Character = metadataToCharacter(metadata);
      setCharacter(character);

      try {
        const { data } = await axios.post<Quest>(
          '/api/quest',
          character,
          { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('Generated quest:', data);
        setQuest(data);
      } catch (err) {
        console.error('Quest generation failed:', err);
      }
    };

    fetchQuest();
  }, [metadata]);

  if (!quest) {
    const text = "Loading Quest...";
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <MagicParticles />
        <FloatingRunes />
        <div className="fantasy-title text-3xl font-bold flex space-x-1">
          {text.split("").map((char, index) => (
            <motion.span
              key={index}
              className="inline-block"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatDelay: 0.1,
                delay: index * 0.1, // stagger animation per character
                ease: "easeInOut",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full text-amber-100 bg-quest">
      <MagicParticles />

      {/* Floating Runes */}
      <FloatingRunes />

      {/* Dragon Flyby Animation */}
      <AnimatePresence>
        <DragonFlyby />
      </AnimatePresence>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 150px 200px rgba(0,0,0,0.8)",
        }}
      ></div>
      <QuestPage character={character!} quest={quest!} setQuest={setQuest} setCharacter={setCharacter} id={id} />
    </main>
  );
};

export default Page;
