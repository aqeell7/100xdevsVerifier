'use client'
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
function ReclaimDemo() {
  // State to manage verification process
  const [requestUrl, setRequestUrl] = useState('');
  const [proofs, setProofs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 
  const getVerificationReq = async () => {
    try {
      // Set loading state
      setIsLoading(true);

      // Reset previous states
      setRequestUrl('');
      setProofs([]);

      // Validate environment variables
      if (!process.env.NEXT_PUBLIC_APP_ID || 
          !process.env.NEXT_PUBLIC_APP_SECRET || 
          !process.env.NEXT_PUBLIC_PROVIDER_ID) {
        throw new Error('Missing Reclaim Protocol credentials');
      }

      // Initialize the Reclaim SDK with your credentials
      const reclaimProofRequest = await ReclaimProofRequest.init(
        process.env.NEXT_PUBLIC_APP_ID, 
        process.env.NEXT_PUBLIC_APP_SECRET, 
        process.env.NEXT_PUBLIC_PROVIDER_ID
      );
 
      // Generate the verification request URL
      const requestUrl = await reclaimProofRequest.getRequestUrl();
      console.log('Request URL:', requestUrl);
      setRequestUrl(requestUrl);
 
      // Start listening for proof submissions
      await reclaimProofRequest.startSession({
        // Success handling with enhanced user experience
        onSuccess: (proofs) => {
          // Update UI state
          setProofs(proofs);
          
          // Show success toast
          toast.success('Verification Completed Successfully!', {
            position: "top-right",
            autoClose: 3000,
          });

          // Optional: You could add more specific success logic here
          // For example:
          // - Send proofs to your backend
          // - Update user authentication state
          // - Redirect to a protected page
        },
        
        // Comprehensive error handling
        onError: (error) => {
          // Log the error
          console.error('Verification failed', error);
          
          // Show user-friendly error toast
          toast.error(`Verification Failed: ${error.message}`, {
            position: "top-right",
            autoClose: 5000,
          });

          // Reset states
          setRequestUrl('');
          setProofs([]);

          // Optional additional error handling:
          // - Offer a retry button
          // - Provide specific guidance based on error type
        },
      });
    } catch (error) {
      // Handle any initialization or setup errors
      console.error('Verification request error', error);
      
      toast.error(`Error Initiating Verification: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      // Always reset loading state
      setIsLoading(false);
    }
  };
 
  return (
    <div className="max-w-md mx-auto p-4">
      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Verification Button with Loading State */}
      <button 
        onClick={getVerificationReq} 
        disabled={isLoading}
        className={`w-full p-2 rounded ${
          isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isLoading ? 'Initiating...' : 'Get Verification Request'}
      </button>

      {/* QR Code Display */}
      {requestUrl && (
        <div className="my-4 flex flex-col items-center">
          <p className="mb-2 text-sm text-gray-600">Scan QR to Verify</p>
          <QRCode value={requestUrl} />
        </div>
      )}

      {/* Proofs Display */}
      {proofs.length > 0 && (
        <div className="mt-4 p-4 bg-green-50 rounded">
          <h2 className="text-lg font-bold mb-2">Verification Successful!</h2>
          <pre className="bg-white p-2 rounded overflow-x-auto text-sm">
            {JSON.stringify(proofs, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default ReclaimDemo;