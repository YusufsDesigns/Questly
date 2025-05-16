// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import { QuestlyCharacterNFT } from "./QuestlyCharacterNFT.sol";
import { QuestlyLoot } from "./QuestlyLoot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Questly is Ownable {
    QuestlyCharacterNFT public characterContract;
    QuestlyLoot public lootContract;

    // Quest completion tracking
    mapping(uint256 => uint256) public characterQuestCount;

    event QuestCompleted(
        uint256 characterId,
        uint256 questCount,
        uint16 xpEarned
    );

    constructor(address _characterContract, address _lootContract) Ownable(msg.sender) {
        characterContract = QuestlyCharacterNFT(_characterContract);
        lootContract = QuestlyLoot(_lootContract);
    }

    function completeQuest(
        uint256 characterId,
        uint16 xpEarned,
        uint8 str,
        uint8 agi,
        uint8 intel, // renamed from `int`
        uint8 cha,
        uint8 lck,
        string memory tokenURI
    ) public onlyOwner {
        // Increment quest count
        characterQuestCount[characterId]++;

        // Add XP and update stats
        characterContract.addXP(characterId, xpEarned);
        characterContract.updateStats(characterId, str, agi, intel, cha, lck);
        characterContract.setTokenURI(characterId, tokenURI);

        emit QuestCompleted(characterId, characterQuestCount[characterId], xpEarned);
    }
}
