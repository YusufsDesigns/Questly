// app/api/quest/route.ts  
import { NextResponse } from 'next/server'
import { generateQuestForCharacter } from '@/lib/agent/questGenerator'
import { Character } from '@/lib/types'

export async function POST(req: Request) {
    const character: Character = await req.json()
    try {
        console.log('Received character data:', character)
        const quest = await generateQuestForCharacter(character)
        console.log('Generated quest:', quest);
        
        return NextResponse.json(quest)
    } catch (err: any) {
        console.error('Quest generation error:', err)
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
