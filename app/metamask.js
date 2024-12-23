'use client';
import { useState } from 'react';
import { BrowserProvider, Contract, Interface } from 'ethers';
import contractABI from '@/config/contractABI.json';

const CONTRACT_ABI = contractABI;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
const ETHERSCAN_BASE_URL = 'https://sepolia.etherscan.io/tx/';
const OPENSEA_BASE_URL = 'https://testnets.opensea.io/assets/sepolia/';

export default function MintNFT() {
  const [account, setAccount] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [mintedNFT, setMintedNFT] = useState(null);
  const [error, setError] = useState('');

  if (!CONTRACT_ADDRESS || CONTRACT_ABI.length === 0) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h2>
        <p className="text-gray-700">Contract details are missing. Please check environment variables.</p>
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
      const tx = await contract.mintNFT();
      const receipt = await tx.wait();
      const iface = new Interface(CONTRACT_ABI);
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
          continue;
        }
      }
      setMintedNFT({
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

  const getOpenSeaURL = (tokenId) => `${OPENSEA_BASE_URL}${CONTRACT_ADDRESS}/${tokenId}`;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        100xDevs NFT Minting
      </h2>

      <div className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {!account ? (
          <button
            onClick={connectWallet}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}
              </p>
            </div>

            <button
              onClick={mintNFT}
              disabled={isMinting}
              className={`w-full py-3 px-4 rounded-lg font-medium ${
                isMinting 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90 transition-opacity'
              }`}
            >
              {isMinting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Minting in Progress...
                </span>
              ) : (
                'Mint 100xDevs NFT'
              )}
            </button>

            {mintedNFT && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-3">
                <p className="font-medium text-green-800">NFT Minted Successfully! 🎉</p>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">Token ID: {mintedNFT.tokenId}</p>
                  <div className="space-y-2 pt-2">
                    <a
                      href={`${ETHERSCAN_BASE_URL}${mintedNFT.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      View on Etherscan →
                    </a>
                    {mintedNFT.tokenId && (
                      <a
                        href={getOpenSeaURL(mintedNFT.tokenId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        View on OpenSea →
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Note: It may take a few minutes for the NFT to appear on OpenSea
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}