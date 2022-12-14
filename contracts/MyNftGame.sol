// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract MyNftGame is ERC721 {
    struct CharacterAttributes {
        uint characterIndex;
        string name;
        string imgURI;
        uint hp;
        uint maxHp;
        uint attackDamage;
    }

    CharacterAttributes[] defaultChracters;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    mapping(uint => CharacterAttributes) public nftAttributes; //tokenId=>attributes
    mapping(address => uint[]) public ntfOwned; //adress=>tokenId[]

    constructor(
        string[] memory characterNames,
        string[] memory characterImgs,
        uint[] memory characterMaxHp,
        uint[] memory characterAttackDmg
    ) ERC721("Heroes", "Hero") {
        for (uint i = 0; i < characterNames.length; ) {
            defaultChracters.push(
                CharacterAttributes({
                    characterIndex: i,
                    name: characterNames[i],
                    imgURI: characterImgs[i],
                    hp: characterMaxHp[i],
                    maxHp: characterMaxHp[i],
                    attackDamage: characterAttackDmg[i]
                })
            );
            unchecked {
                i += 1;
            }
        }
        _tokenId.increment();
    }

    function mintCharacterNft(uint _characterIndex) internal {
        uint newId = _tokenId.current();
        _safeMint(msg.sender, newId);
        ntfOwned[msg.sender].push(newId);
        nftAttributes[newId] = CharacterAttributes({
            characterIndex: _characterIndex,
            name: defaultChracters[_characterIndex].name,
            imgURI: defaultChracters[_characterIndex].imgURI,
            hp: defaultChracters[_characterIndex].hp,
            maxHp: defaultChracters[_characterIndex].maxHp,
            attackDamage: defaultChracters[_characterIndex].attackDamage
        });
        console.log(
            "Minted NFT w/ tokenId %s and characterIndex %s",
            newId,
            _characterIndex
        );
        _tokenId.increment();
    }

    function creatCharacter(uint _characterIndex) external {
        uint[] storage nfts = ntfOwned[msg.sender];
        require(nfts.length == 0, "Already created");
        mintCharacterNft(_characterIndex);
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
