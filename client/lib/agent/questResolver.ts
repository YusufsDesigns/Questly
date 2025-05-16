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
  2. Incorporates statistical checks with dramatic tension (success or failure should both be interesting)
  3. Introduces unexpected twists, complications, or revelations that deepen the story
  4. Awards appropriate rewards for success or imposes meaningful consequences for failure
  5. Most importantly, advances the story to the next stage rather than concluding it
  
  Remember that this is a multi-stage adventure. Each choice moves the story forward to a new stage with new choices until the quest reaches its conclusion at the final stage.
  
  For character progression:
  - Reward successes with potential stat increases
  - Create opportunities for character growth even in setbacks
  - Ensure rewards feel meaningful and tied to the character's actions
  
  Provide the response in this JSON format:
  {
    "outcome": {
      "description": string,  // Rich, detailed narrative of what happens
      "success": boolean,     // Whether the stat check succeeded
      "statCheck": {
        "stat": string,       // The stat that was checked
        "difficulty": number, // How difficult the check was
        "roll": number,       // The character's effective roll
        "threshold": number   // What was needed to succeed
      },
      "rewards": {        // Experience points gained
        "lootEligible": boolean,
        "lootQuality": "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" // Rarity tier of the loot
      }
    },
    "nextStage": {
      "questStage": number,   // The new stage number
      "stageTitle": string,   // A title for this stage
      "stageDescription": string, // Detailed description of the new situation
      "options": [            // New choices for this stage
        {
          "id": number,
          "text": string,
          "requiredStat": string,
          "difficulty": number
        }
      ],
      "isQuestComplete": boolean // Whether this concludes the quest
    }
  }`;

  const userPrompt = `Continue the story for this quest choice:
  Character: ${JSON.stringify(characterData, null, 2)}
  Quest: ${JSON.stringify(questData, null, 2)}
  Choice Index: ${choiceIndex}
  
  Remember that this is stage ${questData.questStage} of ${questData.totalStages || "multiple"} stages in this quest. 
  ${questData.questStage >= (questData.totalStages || 3) ? "This is the final stage of the quest, so conclude the story appropriately." : "This is not the final stage, so continue the adventure with new choices."} 
  Make the narrative exciting and make the player feel like their choices matter!`;

  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: systemPrompt,
    prompt: userPrompt,
    temperature: 0.7,
  });

  // Parse the response
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