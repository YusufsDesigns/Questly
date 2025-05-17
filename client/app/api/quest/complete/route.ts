// app/api/quest/complete/route.ts (or pages/api/quest-complete.ts if using Pages Router)

import { NextRequest, NextResponse } from 'next/server'
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { baseSepolia } from 'viem/chains'
import questlyAbi from '@/abi/questlyAbi.json' // Replace with actual ABI import
import { Character } from '@/lib/types'
import { uploadCharacterToPinata } from '@/lib/utils'

interface CharacterProp {
    characterId: number | string
    character: Character
}

export async function POST(req: NextRequest) {
    try {
        let txHash: `0x${string}`;
        const body = await req.json()

        const {
            characterId,
            character
        } = body as CharacterProp

        console.log('Request Body:', body)

        const privateKey = process.env.PRIVATE_KEY
        console.log('Private Key:', privateKey);


        if (!privateKey) {
            return NextResponse.json({ error: 'Missing private key' }, { status: 400 })
        }

        const account = privateKeyToAccount(`0x${privateKey}`)

        const walletClient = createWalletClient({
            account,
            chain: baseSepolia,
            transport: http(),
        })

        const upload = await uploadCharacterToPinata(character);
        const uri = `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/${upload.IpfsHash}`;

        const contractAddress = process.env.QUESTLY_CONTRACT_ADDRESS;
        if (!contractAddress) {
            return NextResponse.json({ error: 'Contract address not configured' }, { status: 400 });
        }

        try {
            const txHash = await walletClient.writeContract({
                address: contractAddress as `0x${string}`,
                abi: questlyAbi,
                functionName: 'completeQuest',
                args: [
                    BigInt(characterId),
                    BigInt(character.xp),
                    BigInt(character.strength),
                    BigInt(character.agility),
                    BigInt(character.intellect),
                    BigInt(character.charisma),
                    BigInt(character.luck),
                    uri
                ],
            })
    
            console.log('Transaction Hash:', txHash)
            return NextResponse.json({ success: true, txHash })
            
        } catch (error) {
            console.log('Error in transaction:', error);
            throw error;
        }
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
