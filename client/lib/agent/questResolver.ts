"use server"

import { Character, Quest, QuestOutcome } from "../types";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export const resolveQuestChoice = async (
  characterData: Character,
  questData: Quest,
  choiceIndex: number
): Promise<QuestOutcome> => {
  const systemPrompt = `You are the Master Storyteller for Questly, an immersive fantasy RPG game. Your task is to vividly continue the story based on the player's choice, crafting an engaging narrative that feels like a page-turner fantasy novel.

  When resolving a quest choice, create a rich, immersive continuation of the story that:

  1. Provides a detailed, atmospheric description of what unfolds after the choice
  2. Incorporates dramatic tension and meaningful challenges (success or failure should both be interesting)
  3. Introduces unexpected twists, complications, or revelations that deepen the story
  4. Awards appropriate minor rewards for success, and imposes consequences or lessons for failure
  5. Advances the story to the next stage rather than concluding it (unless this is the final stage)

  Use the character's stats and the difficulty of the chosen path to influence the likelihood of success:
  - A character with lower relevant stats should have a harder time succeeding.
  - Success should not be frequent; make it feel earned.
  - Failure can be just as narratively rewarding.

  Loot should not always be granted. Only award loot eligibility in special or significant moments (~20–30% of the time).

  Provide the response in this JSON format:
  {
    "outcome": {
      "description": string,  // Rich, detailed narrative of what happens
      "success": boolean,     // Whether the outcome favored the character or not
      "rewards": {
        "lootEligible": boolean,
        "lootQuality": "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" // Rarity tier of the loot
      }
    },
    "nextStage": {
      "questStage": number,          // The new stage number
      "stageTitle": string,
      "stageDescription": string,
      "options": [
        {
          "id": number,
          "text": string,
          "requiredStat": string,
          "difficulty": number
        }
      ],
      "isQuestComplete": boolean     // Automatically true if this is the final stage
    }
  }`;

  const userPrompt = `Continue the story for this quest choice:

  Character: ${JSON.stringify(characterData, null, 2)}
  Quest: ${JSON.stringify(questData, null, 2)}
  Choice Index: ${choiceIndex}

  Current Stage: ${questData.questStage} of ${questData.totalStages}
  ${
    questData.questStage >= questData.totalStages
      ? "This is the final stage of the quest. Conclude the story appropriately."
      : "This is not the final stage. Continue the adventure with new choices."
  }

  Make the narrative immersive and responsive to player stats and choices. Success should be earned. Loot should only be rewarded occasionally.`;

  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: systemPrompt,
    prompt: userPrompt,
    temperature: 0.7,
  });

  try {
    const cleanedText = text.trim()
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/, '');
    const outcomeData: QuestOutcome = JSON.parse(cleanedText);
    return outcomeData;
  } catch (error) {
    console.error("Failed to parse quest outcome data:", error);
    throw new Error("Failed to generate quest outcome in the correct format");
  }
};
