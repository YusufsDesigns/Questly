// app/lib/types.ts

import { StaticImageData } from "next/image";

export enum CharacterClass {
    Warrior = 0,
    Mage = 1,
    Ninja = 2,
    Knight = 3,
    Demon = 4,
    Ranger = 5,
    Monk = 6,
    Necromancer = 7
}


export enum Alignment {
    Evil = 0,
    Neutral = 1,
    Good = 2
}

export interface Character {
    name: string;
    characterClass: CharacterClass;
    className: string;
    strength: number;
    agility: number;
    intellect: number;
    charisma: number;
    luck: number;
    alignment: Alignment;
    alignmentName: string;
    xp: number;
    description: string;
    image: string;
    tokenId?: string;
}

// Loot enum types
export enum Rarity {
    Common = "Common",
    Uncommon = "Uncommon",
    Rare = "Rare",
    Epic = "Epic",
    Legendary = "Legendary"
}

export enum ItemType {
    Weapon = "Weapon",
    Armor = "Armor",
    Trinket = "Trinket",
    Relic = "Relic",
    Scroll = "Scroll"
}

// Loot interface
export interface Loot {
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

// Quest interface
export interface Quest {
    id: number;
    title: string;
    description: string;
    questStage: number;
    totalStages: number;
    options: QuestOption[];
    questContext: QuestContext;
}

export interface QuestOption {
    id: number;
    text: string;
    requiredStat: string;
    difficulty: number;
}

export interface QuestContext {
    location: string;
    mainNPC: string;
    antagonist: string;
    plotTwist: string;
    questArc: string;
}

export interface QuestOutcome {
    outcome: {
        description: string;
        outcomeStatus: string;
        rewards: {
            xp: number,
            statChange: {
                strength: number,
                agility: number,
                intellect: number,
                charisma: number,
                luck: number
            }
        };
    };
    nextStage: {
        questStage: number;
        stageTitle: string;
        stageDescription: string;
        options: QuestOption[];
        isQuestComplete: boolean;
    };
}

export interface LootItem {
    item: {
        name: string;
        type: string;
        rarity: string;
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
    };
}

export interface QuestUpdate {
    questUpdate: {
        questStage: number;
        stageTitle: string;
        stageDescription: string;
        options: QuestOption[];
        recapHighlights: string;
        questContext: {
            location: string;
            mainNPC: string;
            tension: string;
            stakes: string;
        };
        isQuestComplete: boolean;
    };
}

export interface QuestConclusion {
    conclusion: {
        title: string;
        narrativeResolution: string;
        characterImpact: string;
        worldImpact: string;
        rewards: {
            xp: number;
            statChanges: {
                strength: number;
                agility: number;
                intellect: number;
                charisma: number;
                luck: number;
            };
            lootEligible: boolean;
            lootQuality: string;
        };
        futureHooks: Array<{
            title: string;
            hook: string;
        }>;
    };
}