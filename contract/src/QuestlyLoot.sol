// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721Enumerable, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract QuestlyLoot is ERC721Enumerable, Ownable {
    error QuestlyLoot__NonexistentToken();

    enum Rarity {
        Common,
        Uncommon,
        Rare,
        Epic,
        Legendary
    }

    enum ItemType {
        Weapon,
        Armor,
        Trinket,
        Relic,
        Scroll
    }

    struct Loot {
        string name;
        ItemType itemType;
        Rarity rarity;
        int8 strBonus;
        int8 agiBonus;
        int8 intBonus;
        int8 chaBonus;
        int8 lckBonus;  // Lore or summary
        string uri;          // Full metadata URI
    }

    uint256 private _nextTokenId = 1;
    mapping(uint256 => Loot) public lootItems;

    event LootMinted(uint256 indexed tokenId, string name, Rarity rarity, ItemType itemType);

    constructor() ERC721("QuestlyLoot", "QLOOT") Ownable(msg.sender) {}

    function mintLoot(
        address player,
        string calldata _name,
        ItemType _itemType,
        Rarity _rarity,
        int8 _strBonus,
        int8 _agiBonus,
        int8 _intBonus,
        int8 _chaBonus,
        int8 _lckBonus,
        string calldata _uri
    ) external onlyOwner returns (uint256) {
        uint256 newTokenId = _nextTokenId++;

        lootItems[newTokenId] = Loot({
            name: _name,
            itemType: _itemType,
            rarity: _rarity,
            strBonus: _strBonus,
            agiBonus: _agiBonus,
            intBonus: _intBonus,
            chaBonus: _chaBonus,
            lckBonus: _lckBonus,
            uri: _uri
        });

        _mint(player, newTokenId);
        emit LootMinted(newTokenId, _name, _rarity, _itemType);
        return newTokenId;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (!_exists(tokenId)) revert QuestlyLoot__NonexistentToken();
        return lootItems[tokenId].uri;
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return ownerOf(tokenId) != address(0);
    }
}
