import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { getRarityColor, getRarityGlow, getRarityPattern } from "@/lib/loot";
import { Loot } from "@/lib/types";

// Define the interface for the loot structure
interface LootItem {
  name: string;
  type: string;
  rarity: string;
  image: string;
  statBonuses: {
    strength: number;
    agility: number;
    intellect: number;
    charisma: number;
    luck: number;
  };
  specialEffect: string;
  description: string;
  appearance: string;
  history: string;
}

interface LootModalProps {
  item: LootItem;
  onMint: (loot: Loot) => Promise<void>
  minting: boolean;
  onClose: () => void;
}

export default function LootModal({ item, onMint, minting, onClose }: LootModalProps) {
  const [activeTab, setActiveTab] = useState<'stats' | 'description' | 'history'>('stats');
  const [showEffects, setShowEffects] = useState(false);

  const rarityColors = getRarityColor(item.rarity);
  const rarityGlow = getRarityGlow(item.rarity);
  const rarityPattern = getRarityPattern(item.rarity);
  const borderColor = rarityColors.split(" ")[1];
  const textColor = rarityColors.split(" ")[0];

  // Animation variants for entry
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  // Determine if the item has any stat bonuses
  const hasStatBonuses = Object.values(item.statBonuses).some(val => val !== 0);

  // Particle animation for legendary+ items
  const Particles = () => {
    if (!['legendary', 'epic'].includes(item.rarity.toLowerCase())) return null;
    
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              item.rarity.toLowerCase() === 'legendary' ? 'bg-amber-400' : 'bg-rose-400'
            }`}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
              scale: 0
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              x: [null, Math.random() > 0.5 ? "+=20" : "-=20"]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center z-50 overlay p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`${rarityPattern} rounded-lg border-2 ${borderColor} ${rarityGlow} w-full max-w-lg relative overflow-hidden`}
      >
        <Particles />
        
        {/* Header */}
        <motion.div 
          variants={itemVariants}
          className="relative px-4 py-3 border-b border-gray-700 flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            {['legendary', 'epic'].includes(item.rarity.toLowerCase()) && (
              <Sparkles size={18} className={textColor} />
            )}
            <h2 className={`text-xl font-bold ${textColor}`}>
              {item.rarity} Treasure
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </motion.div>
        
        {/* Item Name and Image */}
        <motion.div 
          variants={itemVariants}
          className="p-4 text-center"
        >
          <h1 className="text-2xl font-bold text-white mb-1">{item.name}</h1>
          <p className="text-gray-300 mb-4">{item.type}</p>
          
          <motion.div 
            className={`relative w-40 h-40 mx-auto mb-4 rounded-lg border ${borderColor} bg-gray-800 bg-opacity-60 flex items-center justify-center`}
            variants={['legendary', 'epic'].includes(item.rarity.toLowerCase()) ? pulseVariants : {}}
            animate={['legendary', 'epic'].includes(item.rarity.toLowerCase()) ? "pulse" : ""}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-contain"
            />
          </motion.div>
        </motion.div>
        
        {/* Tab Navigation */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-3 gap-1 px-4 mb-2"
        >
          {['stats', 'description', 'history'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-2 text-center rounded-t capitalize font-medium ${
                activeTab === tab 
                  ? `bg-gray-800 text-white border-b-2 ${borderColor}`
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>
        
        {/* Content Sections */}
        <motion.div 
          variants={itemVariants}
          className="px-4 pb-4"
        >
          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div className="bg-gray-800 bg-opacity-60 rounded-lg p-4">
              {hasStatBonuses && (
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {item.statBonuses.strength !== 0 && (
                    <div className="text-center">
                      <div className="text-red-400">STR</div>
                      <div
                        className={`font-mono ${
                          item.statBonuses.strength > 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {item.statBonuses.strength > 0 ? "+" : ""}
                        {item.statBonuses.strength}
                      </div>
                    </div>
                  )}
                  {item.statBonuses.agility !== 0 && (
                    <div className="text-center">
                      <div className="text-green-400">AGI</div>
                      <div
                        className={`font-mono ${
                          item.statBonuses.agility > 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {item.statBonuses.agility > 0 ? "+" : ""}
                        {item.statBonuses.agility}
                      </div>
                    </div>
                  )}
                  {item.statBonuses.intellect !== 0 && (
                    <div className="text-center">
                      <div className="text-blue-400">INT</div>
                      <div
                        className={`font-mono ${
                          item.statBonuses.intellect > 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {item.statBonuses.intellect > 0 ? "+" : ""}
                        {item.statBonuses.intellect}
                      </div>
                    </div>
                  )}
                  {item.statBonuses.charisma !== 0 && (
                    <div className="text-center">
                      <div className="text-purple-400">CHA</div>
                      <div
                        className={`font-mono ${
                          item.statBonuses.charisma > 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {item.statBonuses.charisma > 0 ? "+" : ""}
                        {item.statBonuses.charisma}
                      </div>
                    </div>
                  )}
                  {item.statBonuses.luck !== 0 && (
                    <div className="text-center">
                      <div className="text-yellow-400">LCK</div>
                      <div
                        className={`font-mono ${
                          item.statBonuses.luck > 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {item.statBonuses.luck > 0 ? "+" : ""}
                        {item.statBonuses.luck}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Special Effect */}
              <div className="mb-2">
                <button 
                  onClick={() => setShowEffects(!showEffects)}
                  className={`w-full py-2 flex items-center justify-between ${textColor} border ${borderColor} rounded px-3`}
                >
                  <span className="font-medium flex items-center">
                    <Sparkles size={16} className="mr-2" />
                    Special Effect
                  </span>
                  {showEffects ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                
                {showEffects && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-gray-300 p-3 bg-gray-700 bg-opacity-40 rounded"
                  >
                    {item.specialEffect}
                  </motion.div>
                )}
              </div>
            </div>
          )}
          
          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="bg-gray-800 bg-opacity-60 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Appearance</h4>
              <p className="text-gray-300 mb-4">{item.appearance}</p>
              
              <h4 className="text-white font-medium mb-2">Details</h4>
              <p className="text-gray-300">{item.description}</p>
            </div>
          )}
          
          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="bg-gray-800 bg-opacity-60 rounded-lg p-4">
              <p className="text-gray-300" style={{ fontStyle: 'italic' }}>{item.history}</p>
            </div>
          )}
        </motion.div>
        
        {/* Actions */}
        <motion.div 
          variants={itemVariants}
          className="px-4 pb-4 flex justify-between"
        >
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Discard
          </button>
          <motion.button
            onClick={() => onMint(item)}
            disabled={minting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 ${
              ['legendary', 'epic'].includes(item.rarity.toLowerCase())
                ? 'bg-gradient-to-r from-amber-600 to-amber-400'
                : 'bg-amber-600'
            } text-white font-medium rounded-lg shadow-md disabled:opacity-50`}
          >
            {minting ? "Minting..." : "Mint as NFT"}
            {['legendary', 'epic'].includes(item.rarity.toLowerCase()) && (
              <span className="ml-1">✨</span>
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}