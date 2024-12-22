// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HundredXDevsNFT is ERC721, Ownable {
    // Current token ID tracker
    uint256 private _nextTokenId = 1;

    // Base URI for metadata
    string private _baseTokenURI;
    
    // Contract URI for collection metadata
    string private _contractURI;

    // Events
    event NFTMinted(address indexed minter, uint256 tokenId);

    constructor(string memory initialBaseURI, string memory initialContractURI) 
        ERC721("100xDevs", "100X") 
        Ownable(msg.sender) 
    {
        _baseTokenURI = initialBaseURI;
        _contractURI = initialContractURI;
    }

    function mintNFT() external {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        emit NFTMinted(msg.sender, tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    // Function to get contract URI
    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    // Update base URI
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    // Update contract URI
    function setContractURI(string memory newContractURI) external onlyOwner {
        _contractURI = newContractURI;
    }
}