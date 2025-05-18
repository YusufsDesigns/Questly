"use server"

import { Character, Quest, QuestOutcome } from "../types";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

/**
 * Calculates the success probability based on character stats and option requirements
 * @returns number between 0-1 representing success probability
 */
const calculateSuccessProbability = (
  character: Character,
  requiredStat: string,
  difficulty: number
): number => {
  // Get the primary stat value
  let primaryStatValue = 0;
  switch (requiredStat.toLowerCase()) {
    case "strength":
      primaryStatValue = character.strength;
      break;
    case "agility":
      primaryStatValue = character.agility;
      break;
    case "intellect":
      primaryStatValue = character.intellect;
      break;
    case "charisma":
      primaryStatValue = character.charisma;
      break;
    case "luck":
      primaryStatValue = character.luck;
      break;
    default:
      primaryStatValue = 5; // Default moderate value if stat not found
  }

  // Automatic failure if difficulty is at least 5 higher than the required stat
  if (difficulty >= primaryStatValue + 5) {
    // Small chance based on luck to not completely fail
    const luckChance = (character.luck / 40) * 0.15;
    return Math.max(0.01, Math.min(0.15, luckChance));
  }
  
  // Base probability calculation using the primary stat
  let successProbability = primaryStatValue / (primaryStatValue + difficulty);
  
  // Calculate secondary stat bonus with reduced weight - only minimal compensation
  const allStats = [
    character.strength,
    character.agility, 
    character.intellect,
    character.charisma,
    character.luck
  ];
  
  // Find the highest secondary stat (excluding the primary one)
  const secondaryStats = allStats.filter(stat => stat !== primaryStatValue);
  const highestSecondaryStat = Math.max(...secondaryStats);
  
  // Apply a much smaller bonus from secondary stats - limited compensation
  // Maximum 10% bonus even with very high secondary stats
  const secondaryBonus = Math.max(0, Math.min(0.1, (highestSecondaryStat - difficulty) / 30));
  
  // Apply luck modifier (small random element, influenced by character's luck)
  const luckModifier = (character.luck / 30) * (Math.random() * 0.2);
  
  // Calculate the final probability with all factors
  successProbability = Math.min(0.95, Math.max(0.05, successProbability + secondaryBonus + luckModifier));

  return successProbability;
};

/**
 * Determines the outcome status based on the calculated success probability
 */
const determineOutcomeStatus = (successProbability: number): "success" | "partial" | "failure" => {
  const roll = Math.random();
  
  // Higher threshold for success, making it more difficult to achieve
  if (roll < successProbability * 0.6) {
    return "success";
  } else if (roll < successProbability * 1.2) {
    return "partial";
  } else {
    return "failure";
  }
};

/**
 * Calculates appropriate rewards based on quest difficulty, outcome, and character stats
 */
const calculateRewards = (
  character: Character,
  quest: Quest,
  selectedOption: any,
  outcomeStatus: "success" | "partial" | "failure"
): { xp: number; statChanges: Record<string, number> } => {
  // Base XP is determined by quest difficulty and total stages
  const baseXP = selectedOption.difficulty * 5 * (quest.questStage / quest.totalStages);
  
  // Adjust XP based on outcome status
  let xpMultiplier = 0;
  switch (outcomeStatus) {
    case "success":
      xpMultiplier = 1.0;  // Full XP for success
      break;
    case "partial":
      xpMultiplier = 0.6;  // Reduced XP for partial success
      break; 
    case "failure":
      xpMultiplier = 0.25; // Minimal XP for failure (learning from mistakes)
      break;
  }
  
  // Calculate final XP rounded to nearest integer
  const finalXP = Math.round(baseXP * xpMultiplier);
  
  // Initialize stat changes with zeros
  const statChanges: Record<string, number> = {
    strength: 0,
    agility: 0,
    intellect: 0,
    charisma: 0,
    luck: 0
  };
  
  // Determine which stats to improve based on quest outcome and required stat
  const requiredStat = selectedOption.requiredStat.toLowerCase();
  
  // No stat improvements for complete failure
  if (outcomeStatus === "failure") {
    return { xp: finalXP, statChanges };
  }
  
  // Calculate stat improvement amount based on difficulty and outcome
  const baseStat = outcomeStatus === "success" ? 
    Math.min(4, Math.max(1, Math.floor(selectedOption.difficulty / 3))) : 
    Math.min(2, Math.max(1, Math.floor(selectedOption.difficulty / 5)));
  
  // Primary stat improvement - always improve the required stat
  statChanges[requiredStat] = baseStat;
  
  // For successful and challenging quests, occasionally improve a secondary relevant stat
  if (outcomeStatus === "success" && selectedOption.difficulty >= 8 && Math.random() > 0.5) {
    // Determine logical secondary stat based on primary stat
    let secondaryStat = "";
    
    switch (requiredStat) {
      case "strength":
        secondaryStat = Math.random() > 0.5 ? "agility" : "luck";
        break;
      case "agility":
        secondaryStat = Math.random() > 0.5 ? "strength" : "luck";
        break;
      case "intellect":
        secondaryStat = Math.random() > 0.5 ? "charisma" : "luck";
        break;
      case "charisma":
        secondaryStat = Math.random() > 0.5 ? "intellect" : "luck";
        break;
      case "luck":
        // Pick a random stat to pair with luck
        const stats = ["strength", "agility", "intellect", "charisma"];
        secondaryStat = stats[Math.floor(Math.random() * stats.length)];
        break;
    }
    
    // Add a smaller bonus to the secondary stat
    statChanges[secondaryStat] = Math.max(1, Math.floor(baseStat / 2));
  }
  
  return { xp: finalXP, statChanges };
};

export const resolveQuestChoice = async (
  characterData: Character,
  questData: Quest,
  choiceIndex: number
): Promise<QuestOutcome> => {
  // Get the selected option
  const selectedOption = questData.options[choiceIndex];
  if (!selectedOption) {
    throw new Error(`Invalid choice index: ${choiceIndex}`);
  }

  // Calculate success probability based on character stats and difficulty
  const successProbability = calculateSuccessProbability(
    characterData,
    selectedOption.requiredStat,
    selectedOption.difficulty
  );
  
  // Determine outcome status
  const outcomeStatus = determineOutcomeStatus(successProbability);

  const systemPrompt = `You are the Master Storyteller for Questly, an immersive fantasy RPG game. Your task is to vividly continue the story based on the player's choice, crafting an engaging narrative that feels like a page-turner fantasy novel.

  When resolving a quest choice, create a rich, immersive continuation of the story that:

  1. Provides a detailed, atmospheric description of what unfolds after the choice
  2. Incorporates dramatic tension and meaningful challenges (outcomes should be varied and interesting)
  3. Introduces unexpected twists, complications, or revelations that deepen the story
  4. Awards appropriate minor rewards for success, and imposes consequences or lessons for failure
  5. Advances the story to the next stage rather than concluding it (unless this is the final stage)

  The outcome has already been determined to be: "${outcomeStatus}"
  - If "success": Character overcomes the challenge with skill and achieves their goal
  - If "partial": Character struggles but manages some progress, though not complete success
  - If "failure": Character's attempt goes wrong, leading to complications or setbacks
  
  The narrative should highlight how the character's ${selectedOption.requiredStat} (required stat) affected the outcome.
  ${outcomeStatus !== "success" && (selectedOption.requiredStat.toLowerCase() as keyof Character) in characterData && 
    Number(characterData[selectedOption.requiredStat.toLowerCase() as keyof Character] ?? 0) < selectedOption.difficulty 
    ? `Note that the character's ${selectedOption.requiredStat} stat (${characterData[selectedOption.requiredStat.toLowerCase() as keyof Character]}) is below the difficulty level (${selectedOption.difficulty}).` 
    : ""}

  Provide the response in this JSON format:
  {
    "outcome": {
      "description": string,  // narrative of what happens
      "outcomeStatus": "${outcomeStatus}",  // Already determined
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
  Selected Option: ${JSON.stringify(selectedOption, null, 2)}

  Current Stage: ${questData.questStage} of ${questData.totalStages}
  ${
    questData.questStage >= questData.totalStages
      ? "This is the final stage of the quest. Conclude the story appropriately. lootEligible should ONLY be true if the quest outcome was successful."
      : "This is not the final stage. Continue the adventure with new choices. lootEligible should ALWAYS be false at this stage."
  }

  Important rules:
  1. The outcome has been determined based on the character's stats and is: "${outcomeStatus}"
  2. Make the narrative immersive and responsive to player stats and choices.
  3. Each new option should target different stats to give different character builds unique pathways.
  4. Each option should have a different difficulty level appropriate for the situation (between 5-15).
  5. The storytelling should be vivid and incorporate elements of ${characterData.characterClass} abilities.`;

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
    
    // Ensure the predetermined outcome status is used
    outcomeData.outcome.outcomeStatus = outcomeStatus;
    
    // Calculate next stage number
    const nextStageNumber = questData.questStage + 1;
    
    // Programmatically check if quest is complete
    const isQuestComplete = nextStageNumber > questData.totalStages;
    
    // Force isQuestComplete to true if we've reached the end
    outcomeData.nextStage.isQuestComplete = isQuestComplete;
    
    // Ensure nextStage.questStage is properly set
    outcomeData.nextStage.questStage = nextStageNumber;
    
    // Calculate rewards based on outcome and difficulty
    const rewards = calculateRewards(
      characterData,
      questData,
      selectedOption,
      outcomeStatus
    );
    
    // Add rewards to the outcome
    outcomeData.outcome.rewards = {
      xp: rewards.xp,
      statChange: {
        strength: rewards.statChanges.strength,
        agility: rewards.statChanges.agility,
        intellect: rewards.statChanges.intellect,
        charisma: rewards.statChanges.charisma,
        luck: rewards.statChanges.luck
      }
    };
    
    return outcomeData;
  } catch (error) {
    console.error("Failed to parse quest outcome data:", error);
    throw new Error("Failed to generate quest outcome in the correct format");
  }
};