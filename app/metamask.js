import { useState } from 'react';
import { ethers } from 'ethers';

// ABI of your deployed contract
const CONTRACT_ABI = [ /* Your contract ABI here */ ];
const CONTRACT_ADDRESS = '0x...'; // Your deployed contract address

export default function MintNFT() {
  const [account, setAccount] = useState('');

  // Mint NFT function
  const mintNFT = async () => {
    // Ensure MetaMask is connected
    if (!account) {
      await connectWallet();
    }

    try {
      // Create provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create contract instance
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS, 
        CONTRACT_ABI, 
        signer
      );

      // Mint price (should match contract's mintPrice)
      const mintPrice = ethers.utils.parseEther('0.1');

      // Call mint function
      const tx = await contract.mintNFT({
        value: mintPrice
      });

      // Wait for transaction to be mined
      const receipt = await tx.wait();

      console.log('NFT Minted! Transaction hash:', receipt.transactionHash);
    } catch (error) {
      console.error("Failed to mint NFT", error);
    }
  };

  return (
    <div>
      {!account ? (
        <button onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <button onClick={mintNFT}>
          Mint 100xDevs NFT
        </button>
      )}
    </div>
  );
}