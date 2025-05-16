// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { ERC721Enumerable, ERC721 } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract QuestlyCharacterNFT is ERC721Enumerable, Ownable {
    // Custom Errors (gas-efficient)
    error QuestlyCharacterNFT__CharacterDoesNotExist();
    error QuestlyCharacterNFT__AlignmentOutOfBounds();
    error QuestlyCharacterNFT__InvalidCharacterClass();

    uint256 private _nextTokenId = 1;

    enum Alignment {
        Good,
        Neutral,
        Evil
    }

    enum CharacterClass {
        Warrior,      // 0
        Mage,         // 1
        Ninja,        // 2
        Knight,       // 3
        Demon,        // 4
        Ranger,       // 5
        Monk,         // 6
        Necromancer   // 7
    }

    struct Character {
        CharacterClass characterClass;
        uint256 strength;
        uint256 agility;
        uint256 intellect;
        uint256 charisma;
        uint256 luck;
        Alignment alignment;
        uint256 xp;
        string name;
        string uri;
    }

    mapping(uint256 => Character) public characters;

    // Events
    event CharacterCreated(uint256 indexed tokenId, uint8 characterClass, string name);
    event CharacterProgressed(uint256 indexed tokenId, uint256 newXP);
    event AlignmentChanged(uint256 indexed tokenId, int8 good, int8 order, int8 comm); // currently unused

    constructor() ERC721("QuestlyCharacterNFT", "QCHAR") Ownable(msg.sender) {}

    function mintCharacter(
        address player,
        uint8 _class,
        uint8 _str,
        uint8 _agi,
        uint8 _int,
        uint8 _cha,
        uint8 _lck,
        uint8 _alignment,
        string memory _name,
        string memory _uri
    ) external returns (uint256) {
        // Validate class and alignment values
        if (_class > uint8(type(CharacterClass).max)) {
            revert QuestlyCharacterNFT__InvalidCharacterClass();
        }

        if (_alignment > uint8(type(Alignment).max)) {
            revert QuestlyCharacterNFT__AlignmentOutOfBounds();
        }

        uint256 newTokenId = _nextTokenId++;

        characters[newTokenId] = Character({
            characterClass: CharacterClass(_class),
            strength: _str,
            agility: _agi,
            intellect: _int,
            charisma: _cha,
            luck: _lck,
            alignment: Alignment(_alignment),
            xp: 0,
            name: _name,
            uri: _uri
        });

        _mint(player, newTokenId);
        emit CharacterCreated(newTokenId, _class, _name);
        return newTokenId;
    }

    function addXP(uint256 tokenId, uint256 points) external onlyOwner {
        if (!_exists(tokenId)) revert QuestlyCharacterNFT__CharacterDoesNotExist();
        characters[tokenId].xp += points;
        emit CharacterProgressed(tokenId, characters[tokenId].xp);
    }

    function updateStats(
        uint256 tokenId,
        uint8 _str,
        uint8 _agi,
        uint8 _int,
        uint8 _cha,
        uint8 _lck
    ) external onlyOwner {
        if (!_exists(tokenId)) revert QuestlyCharacterNFT__CharacterDoesNotExist();

        Character storage char = characters[tokenId];
        char.strength = _str;
        char.agility = _agi;
        char.intellect = _int;
        char.charisma = _cha;
        char.luck = _lck;
    }

    function setTokenURI(uint256 tokenId, string memory newURI) external onlyOwner {
        if (!_exists(tokenId)) revert QuestlyCharacterNFT__CharacterDoesNotExist();
        characters[tokenId].uri = newURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (!_exists(tokenId)) revert QuestlyCharacterNFT__CharacterDoesNotExist();
        return characters[tokenId].uri;
    }

    // Optional: expose character details
    function getCharacter(uint256 tokenId) external view returns (Character memory) {
        if (!_exists(tokenId)) revert QuestlyCharacterNFT__CharacterDoesNotExist();
        return characters[tokenId];
    }

    // Private helper to check if token exists
    function _exists(uint256 tokenId) internal view returns (bool) {
        return ownerOf(tokenId) != address(0);
    }
}
