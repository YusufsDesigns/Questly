// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { Script } from "forge-std/Script.sol";
import { Questly } from "../src/Questly.sol";

contract DeployQuestly is Script{
    address characterContract = 0x482455145e2338bF8d851FeDdB34893D7f6b4070;
    address lootContract = 0x9B2241cba0018f829fA264D91a090b4D39A9fF07;

    function run() public {
        deployQuestly();
    }

    function deployQuestly() public returns (Questly) {
        vm.startBroadcast();
        Questly questly = new Questly(characterContract, lootContract);
        vm.stopBroadcast();

        return questly;
    }
}