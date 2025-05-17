import { Character, Quest, QuestOption } from "@/lib/types";
import { motion } from "framer-motion";
import React from "react";

interface QuestOptionProps {
  option: QuestOption;
  quest: Quest;
  character: Character;
  index: number;
  onOptionSelect: (
    character: Character,
    quest: Quest,
    choiceIndex: number
  ) => void;
  loading: boolean;
  selectedOptionIndex: number | null;
}

const QuestOptions = ({
  option,
  quest,
  character,
  index,
  onOptionSelect,
  loading,
  selectedOptionIndex,
}: QuestOptionProps) => {
  // Get the relevant character stat value
  const getStatValue = (statName: string): number => {
    const stat = statName.toLowerCase();
    switch (stat) {
      case "strength": return character.strength;
      case "agility": return character.agility;
      case "intellect": return character.intellect;
      case "charisma": return character.charisma;
      case "luck": return character.luck;
      default: return 5; // Default value if stat not found
    }
  };
  
  const statValue = getStatValue(option.requiredStat);
  
  // Calculate relative difficulty based on character's relevant stat
  // This creates a more meaningful comparison between difficulty and character ability
  const relativeDifficulty = Math.max(0, Math.min(100, (option.difficulty / (statValue + 2)) * 50));
  
  // Determine difficulty text and color based on relative difficulty
  let difficultyText = "";
  let difficultyColor = "";
  
  if (relativeDifficulty < 33) {
    difficultyText = "Easy";
    difficultyColor = "text-green-300";
  } else if (relativeDifficulty < 66) {
    difficultyText = "Medium";
    difficultyColor = "text-yellow-300";
  } else {
    difficultyText = "Hard";
    difficultyColor = "text-red-300";
  }
  
  // Determine if this option is the one being loaded
  const isSelected = selectedOptionIndex === index && loading;

  return (
    <motion.button
      key={option.id}
      className={`relative overflow-hidden text-gray-200 w-full p-4 rounded-lg text-left transition-colors cursor-pointer ${
        loading && selectedOptionIndex !== index ? "opacity-50" : ""
      }`}
      style={{
        background: "linear-gradient(rgba(73, 45, 25, 1), rgba(91, 58, 32, 1))",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "#DAA520",
      }}
      onClick={() => onOptionSelect(character, quest, index)}
      disabled={loading}
      whileHover={{ scale: loading ? 1 : 1.01 }}
      whileTap={{ scale: loading ? 1 : 0.99 }}
    >
      {/* Magical border loading animation */}
      {isSelected && (
        <>
          {/* Top border magic animation */}
          <motion.div 
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-yellow-300 to-cyan-400"
            style={{ 
              boxShadow: "0 0 10px 2px rgba(255, 215, 0, 0.7)",
              zIndex: 10 
            }}
            initial={{ width: 0 }}
            animate={{ 
              width: "100%",
              transition: { duration: 1.5, repeat: Infinity }
            }}
          />
          
          {/* Right border magic animation */}
          <motion.div 
            className="absolute top-0 right-0 w-1 bg-gradient-to-b from-cyan-400 via-yellow-300 to-purple-500"
            style={{ 
              boxShadow: "0 0 10px 2px rgba(255, 215, 0, 0.7)",
              zIndex: 10 
            }}
            initial={{ height: 0 }}
            animate={{ 
              height: "100%",
              transition: { duration: 1.5, repeat: Infinity, delay: 0.3 }
            }}
          />
          
          {/* Bottom border magic animation */}
          <motion.div 
            className="absolute bottom-0 right-0 h-1 bg-gradient-to-l from-purple-500 via-yellow-300 to-cyan-400"
            style={{ 
              boxShadow: "0 0 10px 2px rgba(255, 215, 0, 0.7)",
              zIndex: 10 
            }}
            initial={{ width: 0 }}
            animate={{ 
              width: "100%",
              transition: { duration: 1.5, repeat: Infinity, delay: 0.6 }
            }}
          />
          
          {/* Left border magic animation */}
          <motion.div 
            className="absolute bottom-0 left-0 w-1 bg-gradient-to-t from-cyan-400 via-yellow-300 to-purple-500"
            style={{ 
              boxShadow: "0 0 10px 2px rgba(255, 215, 0, 0.7)",
              zIndex: 10 
            }}
            initial={{ height: 0 }}
            animate={{ 
              height: "100%",
              transition: { duration: 1.5, repeat: Infinity, delay: 0.9 }
            }}
          />
          
          {/* Magical particles effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-yellow-300"
                style={{ boxShadow: "0 0 4px 2px rgba(255, 215, 0, 0.7)" }}
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%",
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [
                    Math.random() * 100 + "%", 
                    Math.random() * 100 + "%"
                  ],
                  x: [
                    Math.random() * 100 + "%", 
                    Math.random() * 100 + "%"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Option content */}
      <div className="flex flex-col relative z-1">
        <span className="mb-2">{option.text}</span>

        {/* Stat check display - fantasy styled */}
        <div className="flex items-center mt-1">
          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden relative">
            {/* Background pattern for the stat bar */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.1) 5px, rgba(255,255,255,0.1) 10px)",
              }}
            ></div>

            {/* Difficulty indicator relative to character stat */}
            <div
              className="h-full rounded-full"
              style={{
                width: `${relativeDifficulty}%`,
                background:
                  relativeDifficulty < 33
                    ? "linear-gradient(90deg, #2D803B, #47A655)"
                    : relativeDifficulty < 66
                    ? "linear-gradient(90deg, #B7950B, #F1C40F)"
                    : "linear-gradient(90deg, #922B21, #E74C3C)",
              }}
            ></div>
            
            {/* Character stat indicator - shows how your stat measures up to the challenge */}
            <div
              className="absolute h-full w-2 bg-white"
              style={{
                left: `${Math.min(100, (statValue / (option.difficulty * 2)) * 100)}%`,
                boxShadow: "0 0 5px 1px rgba(255, 255, 255, 0.7)",
                opacity: 0.8,
              }}
            ></div>
          </div>

          <div
            className="ml-3 flex items-center px-3 py-1 rounded"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(218,165,32,0.4)",
            }}
          >
            {/* Icon representation for the stat */}
            <span className={`text-xs font-medium ${difficultyColor} mr-2`}>
              {option.requiredStat === "strength" && "⚔️"}
              {option.requiredStat === "agility" && "🏹"}
              {option.requiredStat === "intellect" && "📚"}
              {option.requiredStat === "charisma" && "👑"}
              {option.requiredStat === "luck" && "🔮"}
            </span>
            <span className={`text-sm font-medium ${difficultyColor}`}>
              {option.requiredStat}{" "}
              <span className="text-white opacity-80">{statValue}</span>
              {" • "}
              {difficultyText}{" "}
              <span className="text-gray-300 opacity-70">({option.difficulty})</span>
            </span>
          </div>
        </div>
      </div>
      
      {/* Mystical runes appear when loading */}
      {isSelected && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="relative w-8 h-8">
            <motion.div
              className="absolute inset-0 text-xl text-yellow-300"
              style={{ textShadow: "0 0 5px rgba(255, 215, 0, 0.8)" }}
              animate={{ 
                rotate: 360,
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "linear" 
              }}
            >
              ✧
            </motion.div>
            <motion.div
              className="absolute inset-0 text-xl text-yellow-300"
              style={{ textShadow: "0 0 5px rgba(255, 215, 0, 0.8)" }}
              animate={{ 
                rotate: -360,
                opacity: [1, 0.5, 1] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "linear",
                delay: 0.5
              }}
            >
              ⦿
            </motion.div>
          </div>
        </div>
      )}
    </motion.button>
  );
};

export default QuestOptions;