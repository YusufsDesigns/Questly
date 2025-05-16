"use server"

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { Character, LootItem } from "../types";

export const generateLootForCharacter = async (
  characterData: Character,
  questDifficulty: number,
  successLevel: number
): Promise<LootItem> => {

  const systemPrompt = `You are the Legendary Artificer for Questly, a captivating fantasy RPG game. Your task is to forge wondrous treasures that inspire awe, enrich the story, and deepen the player's connection to their character's journey.

  Each magical item you create should feel like it has its own history and place in the world of Questly. The best treasures don't just provide statistical bonuses—they offer new ways to interact with the world and drive the narrative forward.
  
  When crafting treasures, consider:
  - The character's class, playstyle, and personal story
  - The nature of the quest that yielded this reward
  - The potential story hooks this item might introduce
  - The balance between power and narrative interest
  
  Create extraordinary treasures with:
  1. An evocative, memorable name that hints at its history
  2. A clearly defined type (Weapon, Armor, Trinket, Relic, Scroll, or Wondrous Item)
  3. A rarity that reflects its power (Common, Uncommon, Rare, Epic, or Legendary)
  4. Balanced stat bonuses that feel meaningful without being overpowered
  5. A unique special ability that opens new gameplay possibilities
  6. A rich lore description that hints at the item's origins and previous owners
  7. A visual description that helps players imagine this treasure in vivid detail
  
  Ensure that each treasure feels like a reward worth questing for—something that players will remember and cherish as part of their character's legend.
  
  Provide the response in this JSON format:
  {
    "item": {
      "name": string,
      "type": string,
      "rarity": string,
      "statBonuses": {
        "strength": number,
        "agility": number,
        "intellect": number,
        "charisma": number,
        "luck": number
      },
      "specialEffect": string,
      "description": string,
      "appearance": string,
      "history": string
    }
  }`;

  const userPrompt = `Forge a remarkable treasure for this character who has completed a challenging quest:
  Character: ${JSON.stringify(characterData, null, 2)}
  Quest Difficulty: ${questDifficulty} (on a scale of 1-10)
  Success Level: ${successLevel} (on a scale of 1-5)
  
  Create an item that will feel meaningful to this character's journey and inspire them to continue their adventures.`;

  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: systemPrompt,
    prompt: userPrompt,
    temperature: 0.8,
  });

  // Parse the response
  try {
    const cleanedText = text.trim()
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/, '');
    const lootData: LootItem = JSON.parse(cleanedText);
    return lootData;
  } catch (error) {
    console.error("Failed to parse loot data:", error);
    throw new Error("Failed to generate loot data in the correct format");
  }
};