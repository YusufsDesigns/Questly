import { useState } from "react";
import { motion } from "framer-motion";
import { Loot } from "../lib/types";

interface InventoryPanelProps {
  inventory: Loot[];
  onClose: () => void;
}

export default function InventoryPanel({ inventory, onClose }: InventoryPanelProps) {
  const [selectedItem, setSelectedItem] = useState<Loot | null>(null);

  // Get color for rarity
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "text-gray-300";
      case "Uncommon":
        return "text-green-400";
      case "Rare":
        return "text-blue-400";
      case "Epic":
        return "text-purple-400";
      case "Legendary":
        return "text-amber-400";
      default:
        return "text-white";
    }
  };

  // Get border color for rarity
    const getRarityBorder = (rarity: string) => {
      switch (rarity) {
        case "Common":
          return "border-gray-500";
        case "Uncommon":
          return "border-green-600";
        case "Rare":
          return "border-blue-600";
        case "Epic":
          return "border-purple-600";
        case "Legendary":
          return "border-amber-600";
        default:
          return "border-gray-700";
      }
    };
  
    return (
      <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2>Inventory</h2>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }