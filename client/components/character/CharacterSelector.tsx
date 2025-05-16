// app/components/CharacterSelector.tsx
"use client";

import { useEffect, useState } from "react";
import { CHARACTER_TEMPLATES } from "../../lib/constants";
import CharacterCard from "./CharacterCard";
import { motion } from "framer-motion";
import { Character } from "@/lib/types";
import {
  type BaseError,
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import characterAbi from "@/abi/characterAbi.json";
import { uploadCharacterToPinata } from "@/lib/utils";
import { keccak256, toBytes } from "viem";
import Link from "next/link";
import { useUserNFTs } from "@/hooks/useUserNFTs";

export default function CharacterSelector() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [tokenId, setTokenId] = useState<bigint | null>(null);

  const handleSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const { data: hash, error, writeContract } = useWriteContract();
  const { data: receipt, isSuccess: isReceiptReady } =
    useWaitForTransactionReceipt({
      hash,
    });
  const account = useAccount();
  const { characters, loading } = useUserNFTs(account.address!);
  

  // Calculate this once outside of effects and functions
  const characterCreatedTopic = keccak256(
    toBytes("CharacterCreated(uint256,uint8,string)")
  );

  useEffect(() => {
    if (isReceiptReady && receipt) {

      const characterCreatedLog = receipt.logs.find(
        (log) => log.topics[0] === characterCreatedTopic
      );

      if (characterCreatedLog) {
        try {
          if (characterCreatedLog.topics[1]) {
            const newTokenId = BigInt(characterCreatedLog.topics[1]);
            setTokenId(newTokenId);
          }
        } catch (error) {
          console.error("Error parsing tokenId:", error);
        }
      }
    }
  }, [receipt, isReceiptReady, characterCreatedTopic]);

  const mint = async (character: Character) => {
    setIsLoading(true);
    try {
      const upload = await uploadCharacterToPinata(character);
      const uri = `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/${upload.IpfsHash}`;

      const contractAddress =
        process.env.NEXT_PUBLIC_CHARACTER_NFT_CONTRACT_ADDRESS;
      if (!contractAddress) throw new Error("Contract address is not defined");

      writeContract({
        address: contractAddress as `0x${string}`,
        abi: characterAbi,
        functionName: "mintCharacter",
        args: [
          account.address, // player's wallet address
          BigInt(character.characterClass), // uint8 - class enum value
          BigInt(character.strength), // uint8
          BigInt(character.agility), // uint8
          BigInt(character.intellect), // uint8
          BigInt(character.charisma), // uint8
          BigInt(character.luck), // uint8
          BigInt(character.alignment), // uint8 - enum value for Alignment
          character.name, // string
          uri, // string
        ],
      });
    } catch (error) {
      console.error("Error saving character:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!tokenId ? (
        characters.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-7xl mx-auto p-4"
          >
            <div className="text-center mb-8">
              <h2 className="fantasy-subtitle mb-2">Choose Your Champion</h2>
              <p className="text-gray-300">
                Select a character to begin your adventure in the realm of
                Questly
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 items-center justify-center">
              {CHARACTER_TEMPLATES.map((character, index) => (
                <motion.div
                  key={character.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CharacterCard
                    character={character}
                    isSelected={selectedCharacter?.name === character.name}
                    onSelect={handleSelect}
                    mint={mint}
                    noMint={false}
                    isLoading={isLoading}
                    error={error as BaseError}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-7xl mx-auto p-4"
          >
            <div className="text-center mb-8">
              <h2 className="fantasy-subtitle mb-2">Choose Your Champion</h2>
              <p className="text-gray-300">
                Select your character to continue your adventure in the realm of
                Questly
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 items-center justify-center">
              {characters.map((character, index) => (
                <motion.div
                  key={character.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CharacterCard
                    character={character}
                    isSelected={selectedCharacter?.name === character.name}
                    onSelect={handleSelect}
                    mint={mint}
                    noMint={true}
                    tokenId={character.tokenId}
                    isLoading={isLoading}
                    error={error as BaseError}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-7xl mx-auto p-4"
            >
              <div className="text-center mb-8">
                <h2 className="fantasy-subtitle mb-2">Choose A New Champion</h2>
                <p className="text-gray-300">
                  Select a new character and start another adventure in the realm of
                  Questly
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 items-center justify-center">
                {CHARACTER_TEMPLATES.map((character, index) => (
                  <motion.div
                    key={character.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CharacterCard
                      character={character}
                      isSelected={selectedCharacter?.name === character.name}
                      onSelect={handleSelect}
                      mint={mint}
                      noMint={false}
                      isLoading={isLoading}
                      error={error as BaseError}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )
      ) : (
        <motion.div
          key="ready"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel max-w-md mx-auto p-8 text-center"
        >
          <h2 className="fantasy-subtitle mb-4">Ready for Adventure!</h2>
          <p className="text-gray-300 mb-6">
            Your character NFT has been minted and is ready to embark on an epic
            quest.
          </p>
          <Link
            href={`/quest/${tokenId}`}
            className="btn-fantasy text-sm animate-pulse"
          >
            Start Quest
          </Link>
        </motion.div>
      )}
    </>
  );
}
