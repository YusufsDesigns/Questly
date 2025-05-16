"use client"

import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import characterAbi from "@/abi/characterAbi.json";

const contractAddress = process.env.NEXT_PUBLIC_CHARACTER_NFT_CONTRACT_ADDRESS as `0x${string}`;

export function useNFTMetadata(tokenId: bigint) {
  const [metadata, setMetadata] = useState<any>(null);

  const { data: uri } = useReadContract({
    address: contractAddress,
    abi: characterAbi,
    functionName: "tokenURI",
    args: [tokenId],
  });

  useEffect(() => {
    async function fetchMetadata() {
      if (!uri || typeof uri !== 'string') return;

      try {
        const res = await fetch(uri as string);
        const json = await res.json();
        
        setMetadata(json);
      } catch (err) {
        console.error("Failed to fetch metadata:", err);
      }
    }

    fetchMetadata();
  }, [uri]);

  return { metadata, uri };
}
