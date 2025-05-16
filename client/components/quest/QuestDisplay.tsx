import { motion, AnimatePresence } from "framer-motion";
import GoldenCorner from "../GoldenCorner";
import { Character, Quest, QuestConclusion, QuestOutcome } from "@/lib/types";
import QuestOptions from "./QuestOptions";
import QuestOutcomes from "./QuestOutcomes";
import QuestCompletion from "./QuestCompletion";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";

interface QuestDisplayProps {
  quest: Quest;
  setQuest: Dispatch<SetStateAction<Quest | null>>;
  character: Character;
  outcome: QuestOutcome;
  completedQuest: QuestConclusion;
  questComplete: boolean;
  setQuestComplete: Dispatch<SetStateAction<boolean>>
  onOptionSelect: (
    character: Character,
    quest: Quest,
    choiceIndex: number
  ) => void;
  onNextStage: () => void;
  loading: boolean;
}

export default function QuestDisplay({
  quest,
  setQuest,
  character,
  outcome,
  completedQuest,
  questComplete,
  setQuestComplete,
  onOptionSelect,
  onNextStage,
  loading,
}: QuestDisplayProps) {
  const [questLoading, setQuestLoading] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  const handleNextQuest = async () => {
      setQuestLoading(true);

      // Create a follow-up quest based on the completed quest
    const followupResponse = await axios.post('/api/quest/followup', {
        character,
        previousQuest: quest,
        questConclusion: completedQuest,
      });

      const followupQuest = followupResponse.data;
      console.log('Follow-up Quest:', followupQuest);
      
      setQuestLoading(false);
      setQuestComplete(false);
      setQuest(followupQuest);
  }

  // Custom handler to track which option was selected before passing to parent
  const handleOptionSelect = (character: Character, quest: Quest, choiceIndex: number) => {
    setSelectedOptionIndex(choiceIndex);
    onOptionSelect(character, quest, choiceIndex);
  }

  return (
    <div
      className="flex-1 flex flex-col relative"
      style={{
        background:
          "linear-gradient(rgba(73, 45, 25, 1), rgba(91, 58, 32, 1))",
        borderWidth: "4px",
        borderStyle: "solid",
        borderColor: "#DAA520",
      }}
    >
      <div
        className="absolute -top-11 -left-3 px-8 py-1 text-white font-bold text-xl"
        style={{
          background:
            "linear-gradient(rgba(73, 45, 25, 1), rgba(91, 58, 32, 1))",
          borderWidth: "4px",
          borderStyle: "solid",
          borderColor: "#DAA520",
        }}
      >
        <GoldenCorner position="top-left" />
        <GoldenCorner position="top-right" />
        {character.name}'s Quest
      </div>
      {/* Golden corner decorations using the reusable component */}
      <GoldenCorner position="top-right" />
      <GoldenCorner position="bottom-left" />
      <GoldenCorner position="bottom-right" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg sm:p-4 mb-4 flex-1"
      >
        <AnimatePresence mode="wait">
          {questComplete ? (
            <motion.div
              key="completion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <QuestCompletion 
                completedQuest={completedQuest} 
                onNextQuest={handleNextQuest} 
                loading={questLoading}
              />
            </motion.div>
          ) : outcome ? (
            <QuestOutcomes outcome={outcome} onNextStage={onNextStage} loading={loading} />
          ) : (
            <motion.div
              key="options"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-white max-sm:p-4 mb-4">{quest.description}</p>
              <h3 className="text-white font-semibold mb-4 text-xl max-sm:px-4">
                How will you proceed?
              </h3>
              <div className="flex flex-col gap-3 max-sm:px-4">
                {quest.options.map((option, index) => {
                  return (
                    <QuestOptions 
                      key={option.id} 
                      option={option} 
                      quest={quest} 
                      character={character} 
                      index={index} 
                      onOptionSelect={handleOptionSelect} 
                      loading={loading}
                      selectedOptionIndex={selectedOptionIndex}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}