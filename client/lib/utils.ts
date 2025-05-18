// app/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Character, CharacterClass, Alignment, Loot, QuestConclusion, QuestOutcome } from "./types";
import { CHARACTER_TEMPLATES } from "./constants";
import { pinata } from "./pinata";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function saveCharacterToIPFS(character: Character): Promise<string> {
  // Simulated IPFS URI
  return `ipfs://Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
}

export function getAlignmentColor(alignment: number): string {
  switch (alignment) {
    case -1: // Evil
      return "text-red-500";
    case 0: // Neutral
      return "text-amber-500";
    case 1: // Good
      return "text-emerald-500";
    default:
      return "text-gray-500";
  }
}

export function getProgressColor(statValue: number): string {
  // Color based on stat value (1-10)
  if (statValue <= 3) return "bg-red-500";
  if (statValue <= 5) return "bg-amber-500";
  if (statValue <= 7) return "bg-emerald-500";
  return "bg-blue-500";
}

export function getCharacterByName(name: string) {
  return CHARACTER_TEMPLATES.find((char) => char.name.toLowerCase() === name.toLowerCase()) || null;
}

export async function uploadCharacterToPinata(character: Character) {
  const metadata = {
    name: character.name,
    description: character.description,
    image: character.image,
    attributes: [
      { trait_type: "Class", value: character.className },
      { trait_type: "Strength", value: character.strength },
      { trait_type: "Agility", value: character.agility },
      { trait_type: "Intellect", value: character.intellect },
      { trait_type: "Charisma", value: character.charisma },
      { trait_type: "Luck", value: character.luck },
      { trait_type: "Alignment", value: character.alignmentName },
      { trait_type: "XP", value: character.xp }
    ]
  };

  try {
    const result = await pinata.upload.json(metadata);
    return result; // Contains the IPFS hash
  } catch (error) {
    console.error("❌ Failed to upload character:", error);
    throw error;
  }
}

export async function uploadLootToPinata(loot: Loot) {
  const metadata = {
    name: loot.name,
    description: loot.description,
    image: loot.image,
    attributes: [
      { trait_type: "Type", value: loot.type },
      { trait_type: "Rarity", value: loot.rarity },
      { trait_type: "Strength Bonus", value: loot.statBonuses.strength },
      { trait_type: "Agility Bonus", value: loot.statBonuses.agility },
      { trait_type: "Intellect Bonus", value: loot.statBonuses.intellect },
      { trait_type: "Charisma Bonus", value: loot.statBonuses.charisma },
      { trait_type: "Luck Bonus", value: loot.statBonuses.luck },
      { trait_type: "Special Effect", value: loot.specialEffect },
      { trait_type: "Appearance", value: loot.appearance },
      { trait_type: "History", value: loot.history }
    ]
  };

  try {
    const result = await pinata.upload.json(metadata);
    return result; // Contains the IPFS hash
  } catch (error) {
    console.error("❌ Failed to upload loot:", error);
    throw error;
  }
}


export function metadataToCharacter(metadata: any): Character {
  const attrMap = Object.fromEntries(
    metadata.attributes.map((attr: any) => [attr.trait_type, attr.value])
  );

  return {
    name: metadata.name,
    description: metadata.description,
    image: metadata.image,
    characterClass: Number(getEnumValue(CharacterClass, attrMap["Class"])),
    className: attrMap["Class"],
    strength: Number(attrMap["Strength"]),
    agility: Number(attrMap["Agility"]),
    intellect: Number(attrMap["Intellect"]),
    charisma: Number(attrMap["Charisma"]),
    luck: Number(attrMap["Luck"]),
    alignment: Number(getEnumValue(Alignment, attrMap["Alignment"])),
    alignmentName: attrMap["Alignment"],
    xp: Number(attrMap["XP"]),
  };
}

// Helper to convert enum name back to enum value
function getEnumValue(enumObj: any, key: string): number {
  return enumObj[key as keyof typeof enumObj];
}

export function calculateLevelFromXP(xp: number): number {
  let level = 1;
  let requiredXP = 0;

  for (let i = 1; i <= 300; i++) {
    const tier = Math.floor((i - 1) / 10) + 1; // Every 10 levels, increase tier
    requiredXP += tier * 100;

    if (xp < requiredXP) {
      return level;
    }

    level = i;
  }

  return 300; // Cap at max level
}

export function applyOutcomeRewards(character: Character, outcome: QuestOutcome): Character {
  return {
    ...character,
    strength: character.strength + outcome.outcome.rewards.statChange.strength,
    agility: character.agility + outcome.outcome.rewards.statChange.agility,
    intellect: character.intellect + outcome.outcome.rewards.statChange.intellect,
    charisma: character.charisma + outcome.outcome.rewards.statChange.charisma,
    luck: character.luck + outcome.outcome.rewards.statChange.luck,
    xp: character.xp + outcome.outcome.rewards.xp,
  };
}

export function applyLootBonuses(character: Character, loot: Loot): Character {
  return {
    ...character,
    strength: character.strength + loot.statBonuses.strength,
    agility: character.agility + loot.statBonuses.agility,
    intellect: character.intellect + loot.statBonuses.intellect,
    charisma: character.charisma + loot.statBonuses.charisma,
    luck: character.luck + loot.statBonuses.luck,
  };
}

export function applyQuestCompletionRewards(character: Character, conclusion: QuestConclusion): Character {
  return {
    ...character,
    xp: character.xp + conclusion.conclusion.rewards.xp,
    strength: character.strength + conclusion.conclusion.rewards.statChanges.strength,
    agility: character.agility + conclusion.conclusion.rewards.statChanges.agility,
    intellect: character.intellect + conclusion.conclusion.rewards.statChanges.intellect,
    charisma: character.charisma + conclusion.conclusion.rewards.statChanges.charisma,
    luck: character.luck + conclusion.conclusion.rewards.statChanges.luck,
  };
}

export function rarityToEnum(rarity: string): number {
  const map = {
    Common: 0,
    Uncommon: 1,
    Rare: 2,
    Epic: 3,
    Legendary: 4,
  };
  if (!(rarity in map)) throw new Error(`Invalid rarity: ${rarity}`);
  return map[rarity as keyof typeof map];
}

export function itemTypeToEnum(type: string): number {
  const map = {
    Weapon: 0,
    Armor: 1,
    Trinket: 2,
    Relic: 3,
    Scroll: 4,
  };
  if (!(type in map)) throw new Error(`Invalid item type: ${type}`);
  return map[type as keyof typeof map];
}



