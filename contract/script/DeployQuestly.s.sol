// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { Script } from "forge-std/Script.sol";
import { Questly } from "../src/Questly.sol";

contract DeployQuestly is Script{
    address characterContract = 0x6f64C8f779e79cF9ccDD0dD23E058CD5826cFEfD;
    address lootContract = 0x9B2241cba0018f829fA264D91a090b4D39A9fF07;
    // Add your backend wallet address here
    address backendWallet = 0x1b9Cf1C441ba1740DfbF97dbA3E2Ef2b331b2A77; // Replace with your actual backend wallet address

    function run() public {
        deployQuestly();
    }

    function deployQuestly() public returns (Questly) {
        vm.startBroadcast();
        
        // Deploy the contract
        Questly questly = new Questly(characterContract, lootContract);
        
        // Transfer ownership to your backend wallet
        questly.transferOwnership(backendWallet);
        
        vm.stopBroadcast();

        return questly;
    }
}