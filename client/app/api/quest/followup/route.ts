// app/api/quest/followup/route.ts
import { NextResponse } from 'next/server';
import { Character, Quest, QuestConclusion } from '@/lib/types';
import { generateFollowupQuest } from '@/lib/agent/questFollowup';

export async function POST(req: Request) {
    try {
        const { character, previousQuest, questConclusion }: {
            character: Character,
            previousQuest: Quest,
            questConclusion: QuestConclusion
        } = await req.json();

        console.log('Generating follow-up quest for:', character);

        const quest = await generateFollowupQuest(character, previousQuest, questConclusion);

        return NextResponse.json(quest);
    } catch (err: any) {
        console.error('Follow-up quest generation error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
