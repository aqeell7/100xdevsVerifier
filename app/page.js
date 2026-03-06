'use client';
import { useState } from 'react';
import ReclaimDemo from './components/Verification';
import MintNFT from './components/MintNft';

export default function MainPage() {
  const [isVerified, setIsVerified] = useState(false); // State to track verification status
  const [verificationProofs, setVerificationProofs] = useState(null); // Optional: Store proofs if needed later

  const handleVerificationSuccess = (proofs) => {
    console.log('Verification Successful in MainPage!', proofs);
    setIsVerified(true); // Update verification status
    setVerificationProofs(proofs); // Optionally store proofs if you need to use them later
    // You can add any other actions you want to perform upon successful verification here
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Claim Your 100xDevs NFT
      </h1>

      <div className="mb-8">
        <ReclaimDemo onVerificationSuccess={handleVerificationSuccess} />
      </div>

      {isVerified && (
        <div className="mt-8">
          <MintNFT verificationSuccessful={isVerified} /> {/* Pass verification status as prop */}
        </div>
      )}

      {!isVerified && (
        <div className="mt-4 text-center text-gray-600">
          <p>Verify your course purchase to unlock NFT minting.</p>
        </div>
      )}
    </div>
  );
}