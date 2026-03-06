'use client';
import { useState } from 'react';
import { BrowserProvider, Contract, Interface } from 'ethers';
import { Wallet, Diamond, ExternalLink, Loader2, Info } from 'lucide-react';
import contractABI from '@/config/contractABI.json';

const CONTRACT_ABI = contractABI;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
const ETHERSCAN_BASE_URL = 'https://sepolia.etherscan.io/tx/';
const OPENSEA_BASE_URL = 'https://testnets.opensea.io/assets/sepolia/';

export default function MintNFT({ verificationSuccessful }) {
  const [account, setAccount] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [mintedNFT, setMintedNFT] = useState(null);
  const [error, setError] = useState('');

  if (!CONTRACT_ADDRESS || CONTRACT_ABI.length === 0) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl space-y-2">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 shrink-0" />
          <p className="font-medium text-sm">Configuration Error</p>
        </div>
        <p className="text-xs text-destructive/80 pl-7">Contract details are missing. Please check your environment variables.</p>
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
        throw new Error('MetaMask not found. Please install MetaMask extension.');
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
      console.error('Minting failed:', error);
      setError(error.message || 'Failed to mint NFT. Please try again.');
    } finally {
      setIsMinting(false);
    }
  };

  const getOpenSeaURL = (tokenId) => `${OPENSEA_BASE_URL}${CONTRACT_ADDRESS}/${tokenId}`;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full space-y-4">
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl mb-4 text-sm animate-in fade-in zoom-in-95">
            {error}
          </div>
        )}

        {!account ? (
          <button
            onClick={connectWallet}
            className="group relative inline-flex items-center justify-center gap-2 w-full px-8 py-4 bg-foreground text-background font-medium rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 w-full h-full bg-electric opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10 flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </span>
          </button>
        ) : (
          <div className="space-y-6">
            <div className="px-4 py-3 bg-muted rounded-xl border border-border text-sm flex items-center justify-between">
              <span className="text-muted-foreground">Connected Wallet</span>
              <span className="font-mono text-foreground font-medium">
                {account.substring(0, 6)}...{account.substring(account.length - 4)}
              </span>
            </div>

            <button
              onClick={mintNFT}
              disabled={isMinting}
              className="group relative inline-flex items-center justify-center gap-2 w-full px-8 py-4 bg-electric font-medium text-white rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 shadow-[0_0_20px_rgba(var(--electric),0.4)]"
            >
              <span className="relative z-10 flex items-center gap-2 font-semibold">
                {isMinting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Minting...
                  </>
                ) : (
                  <>
                    <Diamond className="w-5 h-5" />
                    Mint 100xDevs NFT
                  </>
                )}
              </span>
            </button>

            {mintedNFT && (
              <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
                <p className="font-medium text-green-500 flex items-center gap-2">
                  <span className="text-lg">🎉</span> Successfully Minted!
                </p>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground flex justify-between">
                    <span>Token ID:</span>
                    <span className="font-mono text-foreground">{mintedNFT.tokenId}</span>
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <a
                      href={`${ETHERSCAN_BASE_URL}${mintedNFT.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium bg-background border border-border rounded-lg hover:border-foreground transition-colors"
                    >
                      Etherscan <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    {mintedNFT.tokenId && (
                      <a
                        href={getOpenSeaURL(mintedNFT.tokenId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium bg-background border border-border rounded-lg hover:border-electric hover:text-electric transition-colors"
                      >
                        OpenSea <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground/70 text-center mt-2">
                    Note: It may take a few minutes to appear on OpenSea
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
