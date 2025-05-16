"use server"

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { Character, Quest } from "../types";
import {
  AgentKit
} from "@coinbase/agentkit";

const initializeAgentKit = async (): Promise<AgentKit> => {
  const agentKit = await AgentKit.from({
    cdpApiKeyName: process.env.CDP_API_KEY_NAME,
    cdpApiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY?.replace(/\\n/g, "\n")
  });

  return agentKit;
};

// Quest Generator function
export const generateQuestForCharacter = async (characterData: Character): Promise<Quest> => {
  // const agentKit = await initializeAgentKit();
  // const tools = getVercelAITools(agentKit);

  const systemPrompt = `You are the Master Storyteller for Questly, an immersive fantasy RPG game set in a world of magic, ancient mysteries, and legendary heroes. 
  
  Your task is to craft captivating story-driven quests that will entrance players and keep them deeply engaged in their character's journey. Each quest should feel like a chapter in an epic fantasy novel, with rich descriptions, meaningful choices, and a sense of adventure that makes players eager to discover what happens next.
  
  Study the character's strengths, weaknesses, alignment, and history to create a quest that feels personally tailored to their unique journey. The world of Questly is filled with:
  
  - Ancient ruins hiding forgotten magic
  - Mystical creatures both benevolent and malevolent
  - Political intrigue between rival kingdoms
  - Otherworldly realms beyond mortal comprehension
  - Powerful artifacts with mysterious origins
  - Secret societies with hidden agendas
  
  Each quest should be designed as a multi-stage adventure with twists, surprises, and meaningful decisions that impact how the story unfolds. The player should feel that their choices matter and shape their character's destiny.
  
  Generate a quest with:
  1. An evocative title that ignites curiosity
  2. A richly detailed introduction that draws the player into the story
  3. 2-3 meaningful choices that present genuine moral dilemmas or strategic decisions
  4. Required stat checks for each choice that make character development meaningful
  5. Hooks for future storylines that create a sense of an evolving world
  6. Tantalizing hints about potential rewards that feel significant to the character's growth
  
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
      "questArc": string
    }
  }`;

  const userPrompt = `Generate an enthralling quest for this character that will pull them deeper into the world of Questly: ${JSON.stringify(characterData, null, 2)}`;

  const { text } = await generateText({
    model: openai("gpt-4o-mini"), // You can choose the appropriate model
    system: systemPrompt,
    prompt: userPrompt,
    temperature: 0.8, // Slightly higher temperature for more creative quests
    // tools, // Include the AgentKit tools
  });

  // Parse the response into your Quest interface format
  try {
    const cleanedText = text.trim()
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/, '');
    const questData: Quest = JSON.parse(cleanedText);
    return questData;
  } catch (error) {
    console.error("Failed to parse quest data:", error);
    throw new Error("Failed to generate quest data in the correct format");
  }
};