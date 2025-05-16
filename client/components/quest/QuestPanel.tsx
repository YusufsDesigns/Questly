import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Quest, QuestOption } from "../../lib/types";

interface QuestPanelProps {
  quest: Quest;
  onOptionSelect: (option: QuestOption) => void;
  outcome: string | null;
  onNextQuest: () => void;
  isLoading: boolean;
}

export default function QuestPanel({
  quest,
  onOptionSelect,
  outcome,
  onNextQuest,
  isLoading,
}: QuestPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-stone-900 bg-opacity-80 rounded-lg border border-amber-700 p-6 text-amber-100 shadow-lg"
    >
      {/* Quest Header */}
      <h2 className="fantasy-subtitle text-2xl text-amber-400 mb-4">
        {quest.title}
      </h2>

      {/* Quest Description */}
      <div className="mb-6 prose prose-amber">
        <p className="text-amber-100">{quest.description}</p>
      </div>

      {/* Outcome Display */}
      {outcome && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-lg bg-amber-900 bg-opacity-40 border border-amber-600"
        >
          <h3 className="text-amber-300 mb-2 font-bold">Outcome:</h3>
          <p className="text-amber-100">{outcome}</p>

          <div className="mt-4">
            <Button
              className="btn-fantasy"
              onClick={onNextQuest}
              disabled={isLoading}
            >
              {isLoading ? "Preparing Next Quest..." : "Continue Your Journey"}
            </Button>
          </div>
        </motion.div>
      )}

      {/* Quest Options */}
      {!outcome && (
        <div className="space-y-4">
          <h3 className="text-amber-300 mb-2 font-bold">What will you do?</h3>

          {quest.options.map((option) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: option.id * 0.1 }}
              className="w-full"
            >
              <Button
                className="w-full text-left p-4 bg-amber-900 bg-opacity-40 hover:bg-amber-800 hover:bg-opacity-60 border border-amber-600 rounded-lg transition-colors duration-200 flex justify-between items-center"
                disabled={isLoading}
                onClick={() => onOptionSelect(option)}
              >
                <span className="flex-1">{option.text}</span>
                <span className="text-xs px-2 py-1 bg-amber-700 rounded-full ml-2">
                  {option.requiredStat.toUpperCase()} {option.difficulty}+
                </span>
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      )}
    </motion.div>
  );
}
