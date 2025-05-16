import { Alignment, Character, CharacterClass } from './types';

const baseUrl = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL

export const CHARACTER_TEMPLATES: Character[] = [
    {
        name: "Thorne",
        characterClass: CharacterClass.Warrior,
        className: "Warrior",
        strength: 9,
        agility: 5,
        intellect: 2,
        charisma: 4,
        luck: 3,
        alignment: Alignment.Neutral,
        alignmentName: "Neutral",
        xp: 0,
        description:
            "A battle-hardened warrior whose raw strength and sheer endurance dominate the battlefield.",
        image: `${baseUrl}/bafybeigua6fixb3l3jysmonezbizv5pptii5tqbznjfvxpsvoxgzjq3gde`
    },
    {
        name: "Elara",
        characterClass: CharacterClass.Mage,
        className: "Mage",
        strength: 2,
        agility: 4,
        intellect: 10,
        charisma: 7,
        luck: 3,
        alignment: Alignment.Good,
        alignmentName: "Good",
        xp: 0,
        description:
            "Elara channels ancient magical forces with unmatched precision. Her spells are both elegant and deadly.",
        image: `${baseUrl}/bafybeifurn5wlxau4zhahmgu7kkr2y5uvv56x6id3frbqdagonxq3apvji`
    },
    {
        name: "Vex",
        characterClass: CharacterClass.Ninja,
        className: "Ninja",
        strength: 4,
        agility: 9,
        intellect: 5,
        charisma: 6,
        luck: 7,
        alignment: Alignment.Neutral,
        alignmentName: "Neutral",
        xp: 0,
        description:
            "Quick, silent, and lethal—Vex is a master of stealth and deception.",
        image: `${baseUrl}/bafkreig47nday4ixc2ahsdf36t2ouoprpupw5c57eg64pwbx2cho6apmte`
    },
    {
        name: "Solaris",
        characterClass: CharacterClass.Knight,
        className: "Knight",
        strength: 7,
        agility: 3,
        intellect: 5,
        charisma: 8,
        luck: 4,
        alignment: Alignment.Good,
        alignmentName: "Good",
        xp: 0,
        description:
            "A righteous defender wielding holy power, Solaris is a beacon of light against the darkness.",
        image: `${baseUrl}/bafkreiedmrrw4ikvacrhci6hgepd7y4hxmril5b33dooqiwgnyaobc5zfy`
    },
    {
        name: "Kael",
        characterClass: CharacterClass.Demon,
        className: "Demon",
        strength: 3,
        agility: 5,
        intellect: 8,
        charisma: 6,
        luck: 5,
        alignment: Alignment.Evil,
        alignmentName: "Evil",
        xp: 0,
        description:
            "Kael made a pact with dark forces to gain forbidden power. His enemies fear his curse-laden spells.",
        image: `${baseUrl}/bafybeidg4hmgoznelo76e6afgbnzzeuadnm7fowggzizphkr53br25bjeq`
    },
    {
        name: "Lyra",
        characterClass: CharacterClass.Ranger,
        className: "Ranger",
        strength: 5,
        agility: 8,
        intellect: 4,
        charisma: 6,
        luck: 6,
        alignment: Alignment.Neutral,
        alignmentName: "Neutral",
        xp: 0,
        description:
            "Lyra strikes with precision from the shadows of the wild, guided by instinct and survival skills.",
        image: `${baseUrl}/bafkreifro4k2bslgxnuyr65q5ovxhvqouq23ev46ufn5o5eanrdlq4kmta`
    },
    {
        name: "Borin",
        characterClass: CharacterClass.Monk,
        className: "Monk",
        strength: 6,
        agility: 7,
        intellect: 6,
        charisma: 5,
        luck: 4,
        alignment: Alignment.Good,
        alignmentName: "Good",
        xp: 0,
        description:
            "Trained in ancient martial arts and inner harmony, Borin is as disciplined as he is deadly.",
        image: `${baseUrl}/bafybeigzfd6gkvc6kq5ix2k2xpdxziudxe7k2iabnasgjd4i6irh5z75aa`
    },
    {
        name: "Nyx",
        characterClass: CharacterClass.Necromancer,
        className: "Necromancer",
        strength: 3,
        agility: 3,
        intellect: 9,
        charisma: 2,
        luck: 5,
        alignment: Alignment.Evil,
        alignmentName: "Evil",
        xp: 0,
        description:
            "Master of the dead, Nyx raises legions from the grave to do her bidding. Her magic chills the soul.",
        image: `${baseUrl}/bafkreif5vqbbzj6gip4sgcndazzfimixv25gofp6f74r4cwzxtzzcgyoy4`
    }
];

export const STAT_MAX = 10;
