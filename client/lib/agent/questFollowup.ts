"use server"

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { Character, Quest, QuestConclusion } from "../types";

export const generateFollowupQuest = async (
    characterData: Character,
    previousQuestData: Quest,
    questConclusion: QuestConclusion
): Promise<Quest> => {
    const systemPrompt = `You are the Master Storyteller for Questly, an immersive fantasy RPG game set in a world of magic, ancient mysteries, and legendary heroes. 
  
  Your task is to craft a compelling follow-up quest based on the character's previous adventure and its conclusion. This new quest should feel like a natural progression in the character's journey, building upon the events, choices, and consequences of their recent experiences.
  
  A great follow-up quest should:
  1. Connect to at least one story hook mentioned in the conclusion of the previous quest
  2. Acknowledge how the character has grown or changed from their previous adventure
  3. Introduce new challenges that feel like a natural escalation or evolution
  4. Build upon the world impact created by the character's previous choices
  5. Feature returning NPCs where appropriate while introducing compelling new characters
  6. Deepen the lore and world-building established in previous quests
  
  The player should feel that their past actions have shaped the world and influenced what opportunities are now available to them. Their choices matter and have created this unique path forward.
  
  Generate a quest with:
  1. An evocative title that connects to the previous adventure
  2. A richly detailed introduction that acknowledges past events and sets up new challenges
  3. 2-3 meaningful choices that present genuine moral dilemmas or strategic decisions
  4. Required stat checks for each choice that reflect the character's development
  5. References to the consequences of their previous quest
  6. Tantalizing hints about how this quest fits into their larger destiny
  
  Provide the response in JSON format that matches this interface:
  {
    "id": number,
    "title": string,
    "description": string,
    "questStage": 1,
    "totalStages": number,
    "options": [
      {
        "id": number,
        "text": string,
        "requiredStat": string,
        "difficulty": number
      }
    ],
    "questContext": {
      "location": string,
      "mainNPC": string,
      "antagonist": string,
      "plotTwist": string,
      "questArc": string,
      "connectionToPreviousQuest": string
    }
  }`;

    const userPrompt = `Generate an engaging follow-up quest for this character, directly building upon their previous adventure:
  
  Character: ${JSON.stringify(characterData, null, 2)}
  Previous Quest: ${JSON.stringify(previousQuestData, null, 2)}
  Quest Conclusion: ${JSON.stringify(questConclusion, null, 2)}
  
  Create a quest that feels like the next chapter in this character's story, with meaningful connections to their past choices and experiences. Consider how the world has changed due to their actions and what new challenges would naturally arise.
  
  Be sure to integrate at least one of the "futureHooks" mentioned in the conclusion, and reference the "worldImpact" elements to show how the character's actions have affected the world around them.`;

    const { text } = await generateText({
        model: openai("gpt-4o-mini"), // Choose an appropriate model
        system: systemPrompt,
        prompt: userPrompt,
        temperature: 0.8, // Slightly higher temperature for more creative quest building
    });

    // Parse the response into your Quest interface format
    try {
        const cleanedText = text.trim()
            .replace(/^```(?:json)?\s*/i, '')
            .replace(/\s*```$/, '');
        const questData: Quest = JSON.parse(cleanedText);

        // Apply character progression from previous quest conclusion
        // (Optional: Update character stats based on questConclusion.conclusion.rewards.statChanges)

        return questData;
    } catch (error) {
        console.error("Failed to parse follow-up quest data:", error);
        throw new Error("Failed to generate follow-up quest data in the correct format");
    }
};