// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HundredXDevsNFT is ERC721Enumerable, Ownable {
    uint256 private _nextTokenId = 1;
    uint256 public constant MAX_SUPPLY = 100000;

    event NFTMinted(address indexed minter, uint256 tokenId);

    constructor() 
        ERC721("100xDevs", "100X") 
    {}

    function mintNFT() external {
        require(_nextTokenId <= MAX_SUPPLY, "All NFTs minted");

        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(msg.sender, tokenId);
        emit NFTMinted(msg.sender, tokenId);
    }

    function getUserNFTs(address user) external view returns (uint256[] memory) {
        uint256 count = balanceOf(user);
        uint256[] memory tokenIds = new uint256[](count);
        
        for (uint256 i = 0; i < count; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(user, i);
        }
        
        return tokenIds;
    }
}
