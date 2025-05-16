// app/api/quest/conclude/route.ts
import { NextResponse } from 'next/server';
import { Character, Quest } from '@/lib/types';
import { concludeQuest } from '@/lib/agent/questFinale';

export async function POST(req: Request) {
    try {
        const { character, quest }: {
            character: Character,
            quest: Quest
        } = await req.json();

        console.log('Concluding quest for:', character);

        const conclusion = await concludeQuest(character, quest);

        return NextResponse.json(conclusion);
    } catch (err: any) {
        console.error('Quest conclusion error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
