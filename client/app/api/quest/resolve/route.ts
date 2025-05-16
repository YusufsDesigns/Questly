import { NextRequest, NextResponse } from "next/server"; // adjust the path as needed
import { Character, Quest } from "@/lib/types";
import { resolveQuestChoice } from "@/lib/agent/questResolver";

// POST /api/quest/resolve
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const character: Character = body.character;
        const quest: Quest = body.quest;
        const choiceIndex: number = body.choiceIndex;

        if (
            !character ||
            !quest ||
            typeof choiceIndex !== "number"
        ) {
            return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
        }

        const result = await resolveQuestChoice(character, quest, choiceIndex);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error resolving quest choice:", error);
        return NextResponse.json({ error: "Failed to resolve quest choice" }, { status: 500 });
    }
}

