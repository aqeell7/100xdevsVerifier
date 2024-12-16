// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HundredXDevsNFT is ERC721Enumerable, Ownable {
    // Replace Counters library with a simple uint256
    uint256 private _nextTokenId = 1;

    // Maximum supply of NFTs
    uint256 public constant MAX_SUPPLY = 100000;

    // Event for NFT minting
    event NFTMinted(address indexed minter, uint256 tokenId);

    // Constructor now passes address to Ownable and sets token name/symbol
    constructor() 
        ERC721("100xDevs", "100X") 
        Ownable(msg.sender)
    {}

    // Function to mint NFT
    function mintNFT() external {
        // Check total supply limit
        require(_nextTokenId <= MAX_SUPPLY, "All NFTs minted");

        // Get the current token ID and increment
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        // Mint the NFT
        _safeMint(msg.sender, tokenId);

        // Emit minting event
        emit NFTMinted(msg.sender, tokenId);
    }

    // Optional: Function to get user's NFTs
    function getUserNFTs(address _user) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(_user);
        uint256[] memory tokenIds = new uint256[](tokenCount);
        
        for (uint256 i = 0; i < tokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_user, i);
        }
        
        return tokenIds;
    }
}