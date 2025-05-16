"use client";

import { useEffect, useState } from "react";
import { useReadContract, useReadContracts } from "wagmi";
import { Abi } from 'viem';
import characterAbi from "@/abi/characterAbi.json";

const typedCharacterAbi = characterAbi as Abi;
import { metadataToCharacter } from "@/lib/utils";
import { Character } from "@/lib/types";

const contractAddress = process.env.NEXT_PUBLIC_CHARACTER_NFT_CONTRACT_ADDRESS as `0x${string}`;

export function useUserNFTs(owner: `0x${string}`) {
  const [tokenIds, setTokenIds] = useState<bigint[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: balance } = useReadContract({
    address: contractAddress,
    abi: typedCharacterAbi,
    functionName: "balanceOf",
    args: [owner],
  });

  // Setup contract calls for token IDs
  const tokenIdCalls = balance && typeof balance === "bigint" 
    ? Array.from({ length: Number(balance) }, (_, i) => ({
        address: contractAddress,
        abi: typedCharacterAbi,
        functionName: "tokenOfOwnerByIndex",
        args: [owner, BigInt(i)],
      }))
    : [];

  // Batch fetch token IDs
  const { data: tokenIdResults } = useReadContracts({
    contracts: tokenIdCalls,
  });

  // Process token IDs and set up tokenURI calls
  const ids = tokenIdResults
    ?.filter(result => result.status === "success" && result.result)
    .map(result => result.result as bigint) || [];

  const tokenUriCalls = ids.map(id => ({
    address: contractAddress,
    abi: typedCharacterAbi,
    functionName: "tokenURI",
    args: [id],
  }));

  // Batch fetch token URIs
  const { data: tokenUriResults } = useReadContracts({
    contracts: tokenUriCalls,
  });

  // Process token URIs and fetch metadata
  useEffect(() => {
    async function fetchMetadata() {
      if (!tokenUriResults || tokenUriResults.length === 0) {
        if (balance === 0) setLoading(false);
        return;
      }

      try {
        const tokenUris = tokenUriResults
          .filter(result => result.status === "success" && result.result)
          .map(result => result.result as string);

        setTokenIds(ids);

        const characterPromises = tokenUris.map(async (tokenUri, index) => {
          const uri = tokenUri.startsWith("ipfs://")
            ? `https://ipfs.io/ipfs/${tokenUri.replace("ipfs://", "")}`
            : tokenUri;
          
          const response = await fetch(uri);
          const metadata = await response.json();
          const character = metadataToCharacter(metadata);
          
          return {
            ...character,
            tokenId: ids[index].toString()
          };
        });

        const chars = await Promise.all(characterPromises);
        setCharacters(chars);
      } catch (error) {
        console.error("Error fetching NFT metadata:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMetadata();
  }, [tokenUriResults]);

  return { tokenIds, balance, characters, loading };
}