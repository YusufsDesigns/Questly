// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { Script } from "forge-std/Script.sol";
import { QuestlyCharacterNFT } from "../src/QuestlyCharacterNFT.sol";

contract DeployQuestlyCharacter is Script{
    address backendWallet = 0x1b9Cf1C441ba1740DfbF97dbA3E2Ef2b331b2A77;
    function run() public {
        deployQuestlyCharacterNFT();
    }

    function deployQuestlyCharacterNFT() public returns (QuestlyCharacterNFT) {
        vm.startBroadcast();
        QuestlyCharacterNFT questlyCharacterNFT = new QuestlyCharacterNFT();
        questlyCharacterNFT.transferOwnership(backendWallet); 
        vm.stopBroadcast();

        return questlyCharacterNFT;
    }
}