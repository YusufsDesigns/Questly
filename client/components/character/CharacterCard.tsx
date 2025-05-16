// app/components/CharacterCard.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  getAlignmentColor,
  getProgressColor,
  uploadCharacterToPinata,
} from "../../lib/utils";
import { STAT_MAX } from "../../lib/constants";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Character } from "@/lib/types";
import { type BaseError } from "wagmi";
import Link from "next/link";

interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onSelect: (character: Character) => void;
  mint: (character: Character) => void;
  noMint: boolean;
  tokenId?: string;
  isLoading: boolean;
  error: BaseError | null;
}

export default function CharacterCard({
  character,
  isSelected,
  onSelect,
  mint,
  noMint,
  tokenId,
  isLoading,
  error,
}: CharacterCardProps) {
  const [animatedStats, setAnimatedStats] = useState({
    strength: character.strength,
    agility: character.agility,
    intellect: character.intellect,
    charisma: character.charisma,
    luck: character.luck,
  });

  const alignmentColor = getAlignmentColor(character.alignment);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className={`character-card w-full p-4 cursor-pointer ${
        isSelected ? "selected" : ""
      }`}
      onClick={() => onSelect(character)}
    >
      <div className="flex flex-col items-center">
        {/* Character Image with Glow Effect */}
        <div
          className={`relative w-32 h-32 rounded-full overflow-hidden mb-4 ${
            isSelected ? "animate-glow" : ""
          }`}
        >
          <Image
            src={character.image}
            alt={character.name}
            width={128}
            height={128}
            className="object-cover"
          />
        </div>

        {/* Character Name and Class */}
        <h3 className="fantasy-subtitle text-center">{character.name}</h3>
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-amber-600">{character.className}</Badge>
          <Badge className={`${alignmentColor} bg-opacity-20`}>
            {character.alignmentName}
          </Badge>
        </div>

        {/* Character Level */}
        <div className="mb-4 text-center">
          <span className="text-amber-300">Level 1</span>
          <span className="text-gray-400 text-xs ml-2">
            • {character.xp} Essence
          </span>
        </div>

        {/* Stats */}
        <div className="w-full space-y-2">
          <StatBar name="STR" value={animatedStats.strength} max={STAT_MAX} />
          <StatBar name="AGI" value={animatedStats.agility} max={STAT_MAX} />
          <StatBar name="INT" value={animatedStats.intellect} max={STAT_MAX} />
          <StatBar name="CHA" value={animatedStats.charisma} max={STAT_MAX} />
          <StatBar name="LCK" value={animatedStats.luck} max={STAT_MAX} />
        </div>

        {/* Description (only shown when selected) */}
        {isSelected && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-sm text-gray-300 italic text-center"
          >
            {character.description}
          </motion.p>
        )}

        {/* Selection indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isSelected ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-1"
        >
          {isSelected &&
            (noMint ? (
              <Link
                href={`/quest/${tokenId}`}
                className="btn-fantasy text-sm animate-pulse mt-3 block"
              >
                Start Quest
              </Link>
            ) : (
              <div className="flex justify-center mt-3">
                <Button
                  className="btn-fantasy"
                  onClick={() => mint(character)}
                  disabled={isLoading}
                >
                  {isLoading ? "Minting..." : "Mint Character"}
                </Button>
              </div>
            ))}
        </motion.div>

        {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )}
      </div>
    </motion.div>
  );
}

function StatBar({
  name,
  value,
  max,
}: {
  name: string;
  value: number;
  max: number;
}) {
  const percentage = (value / max) * 100;
  const color = getProgressColor(value);

  return (
    <div className="flex items-center">
      <span className="w-10 text-xs text-gray-300">{name}</span>
      <div className="stat-bar flex-1 mx-2">
        <div
          className={`stat-fill ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="w-6 text-xs text-gray-300">{value}</span>
    </div>
  );
}
