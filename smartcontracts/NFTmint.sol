// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HundredXDevsNFT is ERC721, Ownable {
    // Current token ID tracker (more gas efficient than using Counters)
    uint256 private _nextTokenId = 1;

    // Base URI for metadata
    string private _baseTokenURI;

    // Events
    event NFTMinted(address indexed minter, uint256 tokenId);

    constructor(string memory initialBaseURI) 
        ERC721("100xDevs", "100X") 
        Ownable(msg.sender) 
    {
        _baseTokenURI = initialBaseURI;
    }

    // Simplified mint function
    function mintNFT() external {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        emit NFTMinted(msg.sender, tokenId);
    }

    // Override base URI
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    // Update base URI if needed
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }
}