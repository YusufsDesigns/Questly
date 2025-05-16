import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Character } from "../../lib/types";
import Image from "next/image";
import { calculateLevelFromXP } from "@/lib/utils";

interface CharacterStatsProps {
  character: Character;
}

export default function CharacterStats({ character }: CharacterStatsProps) {

  return (
    <div
      className="relative"
      style={{
        background: "linear-gradient(rgba(73, 45, 25, 1), rgba(91, 58, 32, 1))",
        borderWidth: "4px",
        borderStyle: "solid",
        borderColor: "#DAA520",
      }}
    >
      {/* Character card - collapsed view */}
      <motion.div
        className="rounded-lg p-3 flex justify-between gap-2 items-center cursor-pointer"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-full bg-amber-800 flex items-center justify-center overflow-hidden">
            <Image
              src={character.image}
              alt={character.name}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-amber-300 font-bold fantasy-text">
              {character.name}
            </h3>
            <p className="text-gray-300 text-sm">
              Level {calculateLevelFromXP(character.xp)} {character.className} •{" "}
              {character.alignmentName}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <p className="text-cyan-400 font-bold">EXP: </p>
            <p className="text-white font-mono">{character.xp}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-red-400 font-bold">STR: </p>
            <p className="text-white font-mono">{character.strength}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-green-400 font-bold">AGI: </p>
            <p className="text-white font-mono">{character.agility}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-blue-400 font-bold">INT: </p>
            <p className="text-white font-mono">{character.intellect}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-purple-400 font-bold">CHA: </p>
            <p className="text-white font-mono">{character.charisma}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-yellow-400 font-bold">LCK: </p>
            <p className="text-white font-mono">{character.luck}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
