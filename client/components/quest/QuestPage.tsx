"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence } from "framer-motion";
import CharacterStats from "@/components/character/CharacterStats";
import QuestDisplay from "@/components/quest/QuestDisplay";
import LootModal from "@/components/loot/LootModal";
import {
  Character,
  Loot,
  Quest,
  QuestConclusion,
  QuestOutcome,
} from "../../lib/types";
import QuestBanner from "./QuestBanner";
import axios from "axios";
import {
  applyLootBonuses,
  applyOutcomeRewards,
  applyQuestCompletionRewards,
  itemTypeToEnum,
  rarityToEnum,
  uploadLootToPinata,
} from "@/lib/utils";
import { PREDEFINED_LOOT } from "@/lib/loot";
import { useAccount, useWriteContract } from "wagmi";
import lootAbi from "@/abi/lootAbi.json";

export default function QuestPage({
  character,
  quest,
  setQuest,
  setCharacter,
  id,
}: {
  character: Character;
  quest: Quest;
  setQuest: Dispatch<SetStateAction<Quest | null>>;
  setCharacter: Dispatch<SetStateAction<Character | null>>;
  id: string;
}) {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questOutcome, setQuestOutcome] = useState<QuestOutcome | null>(null);
  const [showLootModal, setShowLootModal] = useState(false);
  const [newLoot, setNewLoot] = useState<Loot | null>(null);
  const [questComplete, setQuestComplete] = useState(false);
  const [completedQuest, setCompletedQuest] = useState<QuestConclusion | null>(
    null
  );

  const { data: hash, error, writeContract } = useWriteContract();
  const account = useAccount();

  const handleOptionSelect = async (
    character: Character,
    quest: Quest,
    choiceIndex: number
  ): Promise<QuestOutcome> => {
    if (!character) {
      throw new Error("Character is required");
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/quest/resolve", {
        character,
        quest,
        choiceIndex,
      });

      const outcome: QuestOutcome = response.data;
      setQuestOutcome(outcome);
      setCharacter((prev) =>
        prev ? applyOutcomeRewards(prev, outcome) : null
      );

      return outcome;
    } catch (error: any) {
      console.error("Failed to resolve quest choice:", error);
      throw new Error(
        error?.response?.data?.error ||
          "An error occurred while resolving quest choice"
      );
    } finally {
      setLoading(false);
    }
  };

  const mintLoot = async (loot: Loot) => {
    setIsLoading(true);
    try {
      const upload = await uploadLootToPinata(loot);
      const uri = `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/${upload.IpfsHash}`;

      const contractAddress = process.env.NEXT_PUBLIC_LOOT_NFT_CONTRACT_ADDRESS;
      if (!contractAddress)
        throw new Error("Loot contract address is not defined");

      writeContract({
        address: contractAddress as `0x${string}`,
        abi: lootAbi, // Import your QuestlyLoot ABI here
        functionName: "mintLoot",
        args: [
          account.address, // Player's wallet address
          loot.name,
          BigInt(itemTypeToEnum(loot.type)), // Map to enum index
          BigInt(rarityToEnum(loot.rarity)), // Map to enum index
          BigInt(loot.statBonuses.strength),
          BigInt(loot.statBonuses.agility),
          BigInt(loot.statBonuses.intellect),
          BigInt(loot.statBonuses.charisma),
          BigInt(loot.statBonuses.luck),
          uri,
        ],
      });

      setShowLootModal(false);
      setNewLoot(null);
    } catch (error) {
      console.error("❌ Error minting loot:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextStage = async () => {
    if (!character || !questOutcome?.nextStage) return;

    setLoading(true);
    try {
      const { nextStage } = questOutcome;

      if (!nextStage.isQuestComplete) {
        // Quest is not complete — move to next stage
        setQuest((prev) =>
          prev
            ? {
                ...prev,
                title: nextStage.stageTitle,
                description: nextStage.stageDescription,
                questStage: nextStage.questStage,
                options: nextStage.options,
              }
            : null
        );
      } else {
        const response = await axios.post("/api/quest/finale", {
          character,
          quest,
        });

        const questConclusion = response.data as QuestConclusion;

        // Check if loot should be granted
        if (questConclusion.conclusion.rewards.lootEligible) {
          const quality = questConclusion.conclusion.rewards.lootQuality;

          // Find all loot matching this rarity
          const matchingLoot = PREDEFINED_LOOT.filter(
            (loot) => loot.rarity === quality
          );

          if (matchingLoot.length > 0) {
            // Randomly select one loot from matching pool
            const selectedLoot =
              matchingLoot[Math.floor(Math.random() * matchingLoot.length)];

            // Apply stat bonuses to character
            setCharacter((prev) =>
              prev ? applyLootBonuses(prev, selectedLoot) : null
            );

            // You might want to store this selected loot in state/display it in the UI
            setNewLoot(selectedLoot);
            setShowLootModal(true);
            // Log the loot gained
          }
        }

        setCompletedQuest(questConclusion);
        setQuestComplete(true);
        setCharacter((prev) =>
          prev ? applyQuestCompletionRewards(prev, questConclusion) : null
        );

        setQuestOutcome(null);

        // await axios.post("/api/quest/complete", {
        //   characterId: id,
        //   character: {
        //     ...character,
        //     xp: character.xp + questConclusion.conclusion.rewards.xp,
        //     strength:
        //       character.strength +
        //       questConclusion.conclusion.rewards.statChanges.strength,
        //     agility:
        //       character.agility +
        //       questConclusion.conclusion.rewards.statChanges.agility,
        //     intellect:
        //       character.intellect +
        //       questConclusion.conclusion.rewards.statChanges.intellect,
        //     charisma:
        //       character.charisma +
        //       questConclusion.conclusion.rewards.statChanges.charisma,
        //     luck:
        //       character.luck +
        //       questConclusion.conclusion.rewards.statChanges.luck,
        //   },
        // });
      }

      // Reset outcome in both cases
      setQuestOutcome(null);
    } catch (error) {
      console.error("Error generating next quest:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between relative"
      // style={backgroundStyle}
    >
      <QuestBanner quest={quest} />

      <div className="relative flex flex-col p-2 max-w-[700px] mx-auto">
        {/* Main quest area */}
        <div className="flex-1 flex flex-col mb-3">
          {character && (
            <QuestDisplay
              quest={quest}
              setQuest={setQuest}
              character={character}
              outcome={questOutcome!}
              completedQuest={completedQuest!}
              questComplete={questComplete}
              setQuestComplete={setQuestComplete}
              onOptionSelect={handleOptionSelect}
              onNextStage={handleNextStage}
              loading={loading}
            />
          )}
        </div>
        {/* Top bar with character info */}
        {character && (
          <div className="mb-4">
            <CharacterStats character={character} />
          </div>
        )}
      </div>

      {/* Loot modal */}
      <AnimatePresence>
        {showLootModal && newLoot && (
          <LootModal
            item={newLoot}
            onMint={mintLoot}
            minting={isLoading}
            onClose={() => setShowLootModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
