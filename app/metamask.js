import { useState } from 'react';
import { ethers } from 'ethers';
import contractABI from '../config/contractABI.json';


const CONTRACT_ABI = contractABI;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';

export default function MintNFT() {
  // State to track connected account and minting status
  const [account, setAccount] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [mintedNFT, setMintedNFT] = useState(null);

  // Connect to MetaMask wallet
  const connectWallet = async () => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        // Set the first connected account
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed", error);
        alert("Failed to connect wallet. Please try again.");
      }
    } else {
      // Prompt to install MetaMask if not detected
      alert('MetaMask not found. Please install MetaMask browser extension.');
    }
  };

  // Mint NFT function
  const mintNFT = async () => {
    if (!account) {
      await connectWallet();
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      setIsMinting(true);

      const tx = await contract.mintNFT();
      const receipt = await tx.wait();

      setMintedNFT({
        transactionHash: receipt.transactionHash,
      });

      console.log('NFT Minted! Transaction hash:', receipt.transactionHash);
    } catch (error) {
      console.error('NFT Minting failed', error);
      alert('Failed to mint NFT. Please try again.');
    } finally {
      setIsMinting(false);
    }
  };

  // Render component UI
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">100xDevs NFT Minting</h2>
      
      {!account ? (
        <button 
          onClick={connectWallet}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      ) : (
        <div>
          <p className="mb-4 text-gray-700">
            Connected Wallet: {account.substring(0, 6)}...{account.substring(account.length - 4)}
          </p>
          
          <button 
            onClick={mintNFT}
            disabled={isMinting}
            className={`w-full py-2 rounded ${
              isMinting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isMinting ? 'Minting...' : 'Mint 100xDevs NFT'}
          </button>

          {mintedNFT && (
            <div className="mt-4 p-4 bg-green-100 rounded">
              <p className="text-green-800">
                NFT Minted Successfully! 
              </p>
              <a 
                href={`https://etherscan.io/tx/${mintedNFT.transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Transaction
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}