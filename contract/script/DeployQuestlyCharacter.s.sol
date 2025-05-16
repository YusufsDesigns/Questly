// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { Script } from "forge-std/Script.sol";
import { QuestlyCharacterNFT } from "../src/QuestlyCharacterNFT.sol";

contract DeployQuestlyCharacter is Script{
    function run() public {
        deployQuestlyCharacterNFT();
    }

    function deployQuestlyCharacterNFT() public returns (QuestlyCharacterNFT) {
        vm.startBroadcast();
        QuestlyCharacterNFT questlyCharacterNFT = new QuestlyCharacterNFT();
        vm.stopBroadcast();

        return questlyCharacterNFT;
    }
}