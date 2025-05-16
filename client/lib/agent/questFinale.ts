"use server"

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { Character, Quest, QuestConclusion } from "../types";

export const concludeQuest = async (
  characterData: Character,
  questData: Quest
): Promise<QuestConclusion> => {
  const systemPrompt = `You are the Master Storyteller for Questly, an immersive fantasy RPG game. Your task is to craft a satisfying conclusion to a multi-stage quest, tying together the character's choices and actions into a meaningful finale.

A great quest conclusion should:
1. Resolve the central conflict or mystery established at the beginning
2. Acknowledge the key decisions the character made throughout the quest
3. Provide a sense of accomplishment and narrative closure
4. Plant seeds for future adventures and ongoing story arcs
5. Award appropriate final rewards that reflect the character's success, difficulty of the quest, and progression level

Rewards should scale gradually based on quest difficulty:
- For early-stage quests: XP should typically be between 1 and 3. Stat changes should be minimal, such as +1 or +2 to affected stats.
- As quests get harder: XP can increase moderately (e.g. 4–10), and stat changes may include +2 to +4 where truly justified by the story and player impact.
- Avoid extreme values like hundreds or thousands of XP, or large stat boosts in a single quest.

Provide the response in this JSON format:
{
  "conclusion": {
    "title": string,             // An epic title for the quest conclusion
    "narrativeResolution": string, // A detailed description of how the quest resolves
    "characterImpact": string,   // How this quest has changed the character
    "worldImpact": string,       // How the character's actions affected the world
    "rewards": {
      "xp": number,              // Total XP earned from the quest (scale with quest difficulty and progression)
      "statChanges": {           // Final stat changes from the quest (+1 to +4 per affected stat depending on difficulty)
        "strength": number,
        "agility": number,
        "intellect": number,
        "charisma": number,
        "luck": number
      },
      "lootEligible": boolean,   // Whether the character earns special loot
      "lootQuality": number      // The quality level of the loot (1-10)
    },
    "futureHooks": [             // Story hooks for future quests
      {
        "title": string,         // A title for a potential future quest
        "hook": string           // A brief teaser about this quest possibility
      }
    ]
  }
}`;


  const userPrompt = `Craft an epic conclusion for this character's quest:
  Character: ${JSON.stringify(characterData, null, 2)}
  Quest Journey: ${JSON.stringify(questData, null, 2)}
  
  This character has completed all stages of their quest. Create a memorable and satisfying conclusion that honors their choices and sets up future adventures.`;

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    system: systemPrompt,
    prompt: userPrompt,
    temperature: 0.7,
  });

  // Parse the response
  try {
    const cleanedText = text.trim()
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/, '');
    const conclusionData: QuestConclusion = JSON.parse(cleanedText);
    return conclusionData;
  } catch (error) {
    console.error("Failed to parse quest conclusion data:", error);
    throw new Error("Failed to generate quest conclusion in the correct format");
  }
};