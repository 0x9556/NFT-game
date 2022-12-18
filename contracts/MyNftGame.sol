// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract MyNftGame is ERC721 {
    event CreateCharacter(address indexed addr, uint indexed characterIndex);
    event AttackComplete(
        address indexed addr,
        uint characterIndex,
        uint indexed characterHp,
        uint bossIndex,
        uint indexed bossHp
    );

    using Counters for Counters.Counter;

    struct CharacterAttributes {
        uint characterIndex;
        string name;
        string imgURI;
        uint hp;
        uint maxHp;
        uint attackDamage;
    }

    struct BossAttributes {
        uint bossIndex;
        string name;
        string imgURI;
        uint hp;
        uint maxHp;
        uint attackDamage;
    }

    CharacterAttributes[] defaultCharacters;
    BossAttributes[] defaultBosses;
    BossAttributes private boss;
    Counters.Counter private _tokenId;

    mapping(uint => CharacterAttributes) public nftAttributes; //tokenId=>attributes
    mapping(address => uint[]) public ntfOwned; //adress=>tokenId[]

    constructor(
        string[] memory characterNames,
        string[] memory characterImgs,
        uint[] memory characterMaxHp,
        uint[] memory characterAttackDmg,
        string[] memory bossNames,
        string[] memory bossImgs,
        uint[] memory bossMaxHp,
        uint[] memory bossAttackDmg
    ) ERC721("Heroes", "Hero") {
        uint i;
        for (i = 0; i < characterNames.length; ) {
            defaultCharacters.push(
                CharacterAttributes({
                    characterIndex: i,
                    name: characterNames[i],
                    imgURI: characterImgs[i],
                    hp: characterMaxHp[i],
                    maxHp: characterMaxHp[i],
                    attackDamage: characterAttackDmg[i]
                })
            );
            // CharacterAttributes memory demo = defaultCharacters[i];
            // console.log(
            //     "Done initializing %s w/ HP %s, img %s",
            //     demo.name,
            //     demo.hp,
            //     demo.imgURI
            // );

            defaultBosses.push(
                BossAttributes({
                    bossIndex: i,
                    name: bossNames[i],
                    imgURI: bossImgs[i],
                    hp: bossMaxHp[i],
                    maxHp: bossMaxHp[i],
                    attackDamage: bossAttackDmg[i]
                })
            );
            // BossAttributes memory demo2 = defaultBosses[i];
            // console.log(
            //     "Done initializing %s w/ HP %s, img %s",
            //     demo2.name,
            //     demo2.hp,
            //     demo2.imgURI
            // );

            unchecked {
                i += 1;
            }
        }
        _tokenId.increment();

        uint index;
        unchecked {
            index =
                uint(
                    keccak256(abi.encodePacked(block.number, block.difficulty))
                ) %
                3;
        }

        boss = defaultBosses[index];
        console.log(boss.name);
    }

    function mintCharacterNft(uint _characterIndex) internal {
        uint newId = _tokenId.current();
        _safeMint(msg.sender, newId);
        ntfOwned[msg.sender].push(newId);
        nftAttributes[newId] = CharacterAttributes({
            characterIndex: _characterIndex,
            name: defaultCharacters[_characterIndex].name,
            imgURI: defaultCharacters[_characterIndex].imgURI,
            hp: defaultCharacters[_characterIndex].hp,
            maxHp: defaultCharacters[_characterIndex].maxHp,
            attackDamage: defaultCharacters[_characterIndex].attackDamage
        });
        // console.log(
        //     "Minted NFT w/ tokenId %s and characterIndex %s",
        //     newId,
        //     _characterIndex
        // );
        _tokenId.increment();
    }

    function attackBoss(uint tokenId) external {
        require(checkIfUserHasExactNft(tokenId), "not owned");
        CharacterAttributes storage currentCharacter = nftAttributes[tokenId];
        require(currentCharacter.hp > 0, "character must have HP");
        require(boss.hp > 0, "boss must have HP");
        if (boss.hp < currentCharacter.attackDamage) {
            boss.hp = 0;
            return;
        } else {
            boss.hp = boss.hp - currentCharacter.attackDamage;
        }
        currentCharacter.hp = currentCharacter.hp < boss.attackDamage
            ? 0
            : currentCharacter.hp - boss.attackDamage;

        emit AttackComplete(
            msg.sender,
            currentCharacter.characterIndex,
            currentCharacter.hp,
            boss.bossIndex,
            boss.hp
        );
        // console.log("Player attacked boss. New boss hp: %s", boss.hp);
        // console.log(
        //     "Boss attacked player. New player hp: %s\n",
        //     currentCharacter.hp
        // );
    }

    function createCharacter(uint _characterIndex) external {
        require(!checkIfUserHasNft(msg.sender), "Already created");
        mintCharacterNft(_characterIndex);
        emit CreateCharacter(msg.sender, _characterIndex);
    }

    function checkIfUserHasNft(address account) public view returns (bool) {
        uint[] storage nfts = ntfOwned[account];
        uint nftCounts = nfts.length;
        return nftCounts != 0;
    }

    function checkIfUserHasExactNft(uint tokenId) public view returns (bool) {
        uint[] memory tokenIds = ntfOwned[msg.sender];
        for (uint i = 0; i < tokenIds.length; i++) {
            if (tokenIds[i] == tokenId) return true;
        }
        return false;
    }

    function getAllDefaultCharacters()
        public
        view
        returns (CharacterAttributes[] memory)
    {
        return defaultCharacters;
    }

    function getCurrentBoss() external view returns (BossAttributes memory) {
        return boss;
    }

    function getCharacters() external view returns (uint[] memory) {
        return ntfOwned[msg.sender];
    }

    function tokenURI(
        uint __tokenId
    ) public view override returns (string memory) {
        CharacterAttributes memory charAttr = nftAttributes[__tokenId];
        string memory strHp = Strings.toString(charAttr.hp);
        string memory strMaxHp = Strings.toString(charAttr.maxHp);
        string memory strAttackDmg = Strings.toString(charAttr.attackDamage);
        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name": "',
                charAttr.name,
                " -- NFT #: ",
                Strings.toString(__tokenId),
                '", "description": "This is an NFT that lets people play in the game Metaverse Slayer!", "image": "',
                charAttr.imgURI,
                '", "attributes": [ { "trait_type": "Health Points", "value": ',
                strHp,
                ', "max_value":',
                strMaxHp,
                '}, { "trait_type": "Attack Damage", "value": ',
                strAttackDmg,
                "} ]}"
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }
}
