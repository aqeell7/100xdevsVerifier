'use client';
import { useState } from 'react';
import { BrowserProvider, Contract, Interface } from 'ethers';
import contractABI from '@/config/contractABI.json';

const CONTRACT_ABI = contractABI;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';

// Constants for network-specific links
const ETHERSCAN_BASE_URL = 'https://sepolia.etherscan.io/tx/';
const OPENSEA_BASE_URL = 'https://testnets.opensea.io/assets/sepolia/';

export default function MintNFT() {
  const [account, setAccount] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [mintedNFT, setMintedNFT] = useState(null);
  const [error, setError] = useState('');

  if (!CONTRACT_ADDRESS || CONTRACT_ABI.length === 0) {
    console.error('Contract details are missing. Please check your environment variables.');
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Configuration Error</h2>
        <p className="text-gray-700">
          Contract details are missing. Please ensure your environment variables are set correctly.
        </p>
      </div>
    );
  }

  const connectWallet = async () => {
    try {
      setError('');
      
      if (!window.ethereum) {
        throw new Error('MetaMask not found. Please install MetaMask browser extension.');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Wallet connection failed:', error);
      setError(error.message || 'Failed to connect wallet. Please try again.');
    }
  };

  const mintNFT = async () => {
    try {
      setError('');
      
      if (!account) {
        await connectWallet();
        return;
      }

      if (!window.ethereum) {
        throw new Error('MetaMask not found. Please install MetaMask browser extension.');
      }

      setIsMinting(true);

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Initiate minting
      const tx = await contract.mintNFT();
      console.log('Minting transaction sent:', tx.hash);
      
      // Wait for transaction confirmation
      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt);

      // Create interface instance for parsing logs
      const iface = new Interface(CONTRACT_ABI);
      
      // Find and parse the NFTMinted event
      let tokenId;
      for (const log of receipt.logs) {
        try {
          const parsedLog = iface.parseLog({
            topics: log.topics,
            data: log.data
          });
          
          if (parsedLog.name === 'NFTMinted') {
            tokenId = parsedLog.args.tokenId.toString();
            break;
          }
        } catch (e) {
          // Skip logs that aren't our event
          continue;
        }
      }

      if (!tokenId) {
        console.warn('TokenId not found in transaction logs');
      }

      setMintedNFT({
        transactionHash: receipt.hash,
        tokenId: tokenId
      });

      console.log('NFT Minted Successfully!', {
        transactionHash: receipt.hash,
        tokenId: tokenId
      });

    } catch (error) {
      console.error('NFT Minting failed:', error);
      setError(error.message || 'Failed to mint NFT. Please try again.');
    } finally {
      setIsMinting(false);
    }
  };

  const getOpenSeaURL = (tokenId) => {
    return `${OPENSEA_BASE_URL}${CONTRACT_ADDRESS}/${tokenId}`;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">100xDevs NFT Minting</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 rounded">
          <p className="text-red-800">{error}</p>
        </div>
      )}

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
              isMinting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isMinting ? 'Minting...' : 'Mint 100xDevs NFT'}
          </button>

          {mintedNFT && (
            <div className="mt-4 p-4 bg-green-100 rounded">
              <p className="text-green-800 font-semibold mb-3">NFT Minted Successfully!</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-2">
                  Token ID: {mintedNFT.tokenId}
                </p>
                <a
                  href={`${ETHERSCAN_BASE_URL}${mintedNFT.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline"
                >
                  View Transaction on Etherscan
                </a>
                
                {mintedNFT.tokenId && (
                  <a
                    href={getOpenSeaURL(mintedNFT.tokenId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:underline"
                  >
                    View NFT on OpenSea
                  </a>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Note: It may take a few minutes for the NFT to appear on OpenSea
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}