import { motion } from "framer-motion";
import { QuestConclusion } from "@/lib/types";
import Image from "next/image";
import { Button } from "../ui/button";

interface QuestCompletionProps {
  completedQuest: QuestConclusion;
  onNextQuest: () => void;
  loading: boolean;
}

export default function QuestCompletion({
  completedQuest,
  onNextQuest,
  loading,
}: QuestCompletionProps) {
  const { conclusion } = completedQuest;
  const { statChanges } = conclusion.rewards;

  // Calculate total stat changes
  const totalStatChanges =
    statChanges.strength +
    statChanges.agility +
    statChanges.intellect +
    statChanges.charisma +
    statChanges.luck;

  // Determine loot quality rating
  const getLootQualityText = (quality: number) => {
    if (quality >= 90) return "Legendary";
    if (quality >= 75) return "Epic";
    if (quality >= 60) return "Rare";
    if (quality >= 40) return "Uncommon";
    return "Common";
  };

  const renderStatChange = (stat: string, value: number) => {
    if (value === 0) return null;

    return (
      <div className="flex items-center gap-2">
        <span className="text-white font-medium capitalize">{stat}:</span>
        <span className={value > 0 ? "text-green-400" : "text-red-400"}>
          {value > 0 ? `+${value}` : value}
        </span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col h-full text-white"
    >
      <div className="mb-4 text-center">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl mt-2 font-bold text-yellow-400 mb-2"
        >
          Quest conclusion
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="h-1 w-32 bg-yellow-400 mx-auto rounded-full"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 flex-1 overflow-y-auto max-h-96">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 p-4 bg-black bg-opacity-20 rounded-lg"
        >
          <h3 className="text-lg font-semibold mb-2 text-yellow-300">
            Aftermath
          </h3>
          <p className="text-white mb-3">{conclusion.narrativeResolution}</p>

          <h3 className="text-lg font-semibold my-2 text-yellow-300">
            Character Impact
          </h3>
          <p className="text-white mb-3">{conclusion.characterImpact}</p>

          <h3 className="text-lg font-semibold my-2 text-yellow-300">
            World Impact
          </h3>
          <p className="text-white">{conclusion.worldImpact}</p>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-4 bg-black bg-opacity-20 rounded-lg"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-yellow-300 flex items-center">
              <span className="mr-2">Rewards</span>
            </h3>

            <div className="mt-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white font-medium">Experience:</span>
                <span className="text-green-400 font-bold">
                  +{conclusion.rewards.xp} XP
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-yellow-300">
              Stat Changes
            </h3>
            <div className="space-y-1">
              {renderStatChange("strength", statChanges.strength)}
              {renderStatChange("agility", statChanges.agility)}
              {renderStatChange("intellect", statChanges.intellect)}
              {renderStatChange("charisma", statChanges.charisma)}
              {renderStatChange("luck", statChanges.luck)}

              {totalStatChanges > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-600">
                  <span className="text-white font-medium">Total:</span>
                  <span className="text-green-400 ml-2 font-bold">
                    +{totalStatChanges}
                  </span>
                </div>
              )}
            </div>
          </div>

          {conclusion.futureHooks.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-yellow-300">
                New Opportunities
              </h3>
              <ul className="space-y-2">
                {conclusion.futureHooks.map((hook, index) => (
                  <li key={index} className="text-gray-300 text-sm">
                    <span className="text-yellow-200 font-medium">
                      {hook.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 text-center"
      >
        <button
          className="btn-fantasy relative group overflow-hidden px-8 py-3"
          onClick={onNextQuest}
          disabled={loading}
          style={{
            background: "linear-gradient(to bottom, #8B6914, #DAA520)",
            border: "2px solid #FFD700",
            borderRadius: "4px",
            boxShadow:
              "0 4px 10px rgba(0,0,0,0.3), inset 0 0 6px rgba(255,215,0,0.5)",
          }}
        >
          <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          <span
            className="text-white text-base font-medium relative z-10"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
          >
            {loading ? "Loading Quest..." : "Embark on Next Adventure"}
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
}
