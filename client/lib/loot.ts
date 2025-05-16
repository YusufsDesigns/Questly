import { Loot } from "./types";

// Helper function to get color based on rarity
// Get color for rarity
export const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
        case "common":
            return "text-gray-300 border-gray-400";
        case "uncommon":
            return "text-green-400 border-green-500";
        case "rare":
            return "text-blue-400 border-blue-500";
        case "epic":
            return "text-purple-400 border-purple-500";
        case "legendary":
            return "text-amber-400 border-amber-500";
        case "mythic":
            return "text-rose-400 border-rose-500";
        default:
            return "text-white border-white";
    }
};

// Get background glow for rarity
export const getRarityGlow = (rarity: string) => {
    switch (rarity.toLowerCase()) {
        case "common":
            return "";
        case "uncommon":
            return "shadow-sm shadow-green-600";
        case "rare":
            return "shadow-md shadow-blue-600";
        case "epic":
            return "shadow-lg shadow-purple-600";
        case "legendary":
            return "shadow-xl shadow-amber-500 animate-pulse";
        case "mythic":
            return "shadow-2xl shadow-rose-500 animate-pulse";
        default:
            return "";
    }
};

// Get background pattern for rarity
export const getRarityPattern = (rarity: string) => {
    switch (rarity.toLowerCase()) {
        case "common":
            return "bg-gray-900";
        case "uncommon":
            return "bg-gray-900 bg-opacity-95";
        case "rare":
            return "bg-gradient-to-br from-gray-900 to-blue-950";
        case "epic":
            return "bg-gradient-to-br from-gray-900 to-purple-950";
        case "legendary":
            return "bg-gradient-to-br from-gray-900 via-amber-950 to-gray-900";
        case "mythic":
            return "bg-gradient-to-br from-gray-900 via-rose-950 to-gray-900";
        default:
            return "bg-gray-900";
    }
};

const baseUrl = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL

// Predefined list of loot items
export const PREDEFINED_LOOT: Loot[] = [
    {
        name: "Frostbite Blade",
        type: "Weapon",
        rarity: "Rare",
        image: `${baseUrl}/bafkreicasjrlnc7tgmn76xxtiwqz4tckjkkuzplnsonbjtoyll3rylbwzm`,
        statBonuses: {
            strength: 2,
            agility: 1,
            intellect: 0,
            charisma: 0,
            luck: 0,
        },
        specialEffect: "Deals additional cold damage to enemies.",
        description: "A sword imbued with the essence of eternal frost.",
        appearance: "A sleek silver blade with icy blue runes.",
        history: "Forged by northern blacksmiths using frost elemental cores.",
    },
    {
        name: "Dragonscale Armor",
        type: "Armor",
        rarity: "Epic",
        image: `${baseUrl}/bafkreibj4vqztvmep3eaoxglkaiyvfwlpht5rt5gpawpbwso4mejdjq6gq`,
        statBonuses: {
            strength: 1,
            agility: 0,
            intellect: 0,
            charisma: 0,
            luck: 0,
        },
        specialEffect: "Provides resistance against fire damage.",
        description: "Armor crafted from the scales of ancient dragons.",
        appearance: "Gleaming red-gold plates with dragon motifs.",
        history: "Taken from the carcass of a slain fire wyrm.",
    },
    {
        name: "Amulet of Fortune",
        type: "Trinket",
        rarity: "Uncommon",
        image: `${baseUrl}/bafkreideryvidofb5hvptcjnx52s2sdauszicld6c2nrhdn5jyzxherwr4`,
        statBonuses: {
            strength: 0,
            agility: 0,
            intellect: 0,
            charisma: 0,
            luck: -2,
        },
        specialEffect: "Increases your chance to find rare items.",
        description: "A talisman said to draw fate to the bearer.",
        appearance: "Small jade charm tied with red string.",
        history: "Used by treasure hunters for generations.",
    },
    {
        name: "Tome of Ancient Knowledge",
        type: "Scroll",
        rarity: "Epic",
        image: `${baseUrl}/bafybeicaphdpdl7afj2b63uhyd7levqnjaqhvstfvts65exdq6zodhunie`,
        statBonuses: {
            strength: 0,
            agility: 0,
            intellect: 3,
            charisma: 1,
            luck: 0,
        },
        specialEffect: "Contains forgotten spells from a lost civilization.",
        description: "Bound in faded leather, its pages shimmer faintly.",
        appearance: "An old book etched with glowing glyphs.",
        history: "Recovered from the ruins of Eldara.",
    },
    {
        name: "Heart of the Mountain",
        type: "Relic",
        rarity: "Legendary",
        image: `${baseUrl}/bafkreici633hmci36nsqeoxj6vwsb3mq7ud4rhakh6kw3pygm2vlqo3iqe`,
        statBonuses: {
            strength: 2,
            agility: 0,
            intellect: 1,
            charisma: 0,
            luck: 2,
        },
        specialEffect: "Grants earth magic affinity.",
        description: "A glowing crystal pulsing with ancient power.",
        appearance: "Jagged amber stone with veins of gold.",
        history: "Once belonged to an earth elemental lord.",
    },
    {
        name: "Quicksilver Boots",
        type: "Armor",
        rarity: "Rare",
        image: `${baseUrl}/bafybeigjww3gvgphigegf7hptgq3o7uqfzaxi5kqjj4ecxzlybqbeiqqbq`,
        statBonuses: {
            strength: 0,
            agility: 3,
            intellect: 0,
            charisma: 0,
            luck: 1,
        },
        specialEffect: "Improves dodging and speed.",
        description: "Worn by elite scouts of the Silver Guard.",
        appearance: "Sleek silver boots that shimmer when in motion.",
        history: "Made from quicksilver harvested during a lunar eclipse.",
    },
    {
        name: "Crown of Whispers",
        type: "Trinket",
        rarity: "Epic",
        image: `${baseUrl}/bafkreig3gwqeqge7vayaxitlph3ujavkfmjbgebwi3kdws725fegjuw3ui`,
        statBonuses: {
            strength: 0,
            agility: 0,
            intellect: 1,
            charisma: 3,
            luck: 0,
        },
        specialEffect: "Allows sensing nearby thoughts.",
        description: "Worn by telepaths and mind-mages.",
        appearance: "Thin silver circlet with obsidian gems.",
        history: "Gifted by the Whispering Queen of Lethiria.",
    },
    {
        name: "Ember Dagger",
        type: "Weapon",
        rarity: "Uncommon",
        image: `${baseUrl}/bafkreiafd25gwvp2sany37kemu37wsn6ugoo4rewq56egc5abkrwic4gwq`,
        statBonuses: {
            strength: 1,
            agility: 2,
            intellect: 0,
            charisma: 0,
            luck: 0,
        },
        specialEffect: "Ignites on critical strikes.",
        description: "A short blade with a glowing core.",
        appearance: "Curved blade with ember-red edge.",
        history: "Forged in the flames of the Firekin forge.",
    },
    {
        name: "Scroll of Resurrection",
        type: "Scroll",
        rarity: "Legendary",
        image: `${baseUrl}/bafkreiayme3wk3y3rjnhrjbohfiyftugxvpgt6uazstkwbcehfm22qgz3m`,
        statBonuses: {
            strength: 0,
            agility: 0,
            intellect: 2,
            charisma: 0,
            luck: 0,
        },
        specialEffect: "Revives a fallen ally with full health.",
        description: "Ancient parchment imbued with divine energy.",
        appearance: "Golden scroll sealed with a sun sigil.",
        history: "Created by the High Priests of Solari.",
    },
    {
        name: "Pendant of the Night Sky",
        type: "Trinket",
        rarity: "Rare",
        image: `${baseUrl}/bafkreia5et3q2rzshhadu6iyhyey2ksjoizcthnenglcpy3posjkmfhmsy`,
        statBonuses: {
            strength: 0,
            agility: 0,
            intellect: 2,
            charisma: 1,
            luck: 1,
        },
        specialEffect: "Enhances powers at night.",
        description: "Draws strength from the stars.",
        appearance: "A silver crescent moon with star inlays.",
        history: "Crafted by stargazers of the Lunari Order.",
    },
];