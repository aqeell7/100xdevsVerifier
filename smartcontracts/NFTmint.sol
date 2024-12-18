// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract HundredXDevsNFT is ERC721, Ownable {
    using Strings for uint256;

    // Maximum supply of NFTs
    uint256 public constant MAX_SUPPLY = 100000;

    // Current token ID tracker
    uint256 private _nextTokenId = 1;

    // Base IPFS URI for metadata
    string private _baseTokenURI;

    // Mint price (kept as 0 as per previous discussion)
    uint256 public constant MINT_PRICE = 0;

    // Events
    event NFTMinted(address indexed minter, uint256 tokenId);
    event BaseURIChanged(string newBaseURI);

    // Constructor to set initial metadata base URI
    constructor(string memory initialBaseURI) 
        ERC721("100xDevs", "100X") 
        Ownable(msg.sender) 
    {
        _baseTokenURI = initialBaseURI;
    }

    // Mint function with minimal gas consumption
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

    // Batch minting function to reduce overall gas costs
    function batchMint(uint256 quantity) external {
        require(_nextTokenId + quantity <= MAX_SUPPLY, "Exceeds max supply");

        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = _nextTokenId;
            _nextTokenId++;
            _safeMint(msg.sender, tokenId);
        }
    }

    // Override tokenURI to return IPFS metadata link
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        
        // Construct full metadata path
        return string(abi.encodePacked(
            _baseTokenURI, 
            tokenId.toString(), 
            ".json"
        ));
    }

    // Function to update base URI (in case IPFS link changes)
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
        emit BaseURIChanged(baseURI);
    }

    // Function to get current base URI
    function getBaseURI() external view returns (string memory) {
        return _baseTokenURI;
    }

}