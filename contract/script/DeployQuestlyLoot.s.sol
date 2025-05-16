// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { Script } from "forge-std/Script.sol";
import { QuestlyLoot } from "../src/QuestlyLoot.sol";

contract DeployQuestlyLoot is Script{
    function run() public {
        deployQuestlyLoot();
    }

    function deployQuestlyLoot() public returns (QuestlyLoot) {
        vm.startBroadcast();
        QuestlyLoot questlyLoot = new QuestlyLoot();
        vm.stopBroadcast();

        return questlyLoot;
    }
}