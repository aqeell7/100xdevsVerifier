'use client'
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
function ReclaimDemo() {
  // State management
  const [requestUrl, setRequestUrl] = useState('');
  const [proofs, setProofs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 
  const getVerificationReq = async () => {
    try {
      // Loading and reset logic remains the same as in previous example
      setIsLoading(true);
      setRequestUrl('');
      setProofs([]);

      // Existing verification logic
      const reclaimProofRequest = await ReclaimProofRequest.init(
        process.env.NEXT_PUBLIC_APP_ID, 
        process.env.NEXT_PUBLIC_APP_SECRET, 
        process.env.NEXT_PUBLIC_PROVIDER_ID
      );
 
      const requestUrl = await reclaimProofRequest.getRequestUrl();
      console.log('Request URL:', requestUrl);
      setRequestUrl(requestUrl);
 
      await reclaimProofRequest.startSession({
        onSuccess: (proofs) => {
          setProofs(proofs);
          toast.success('Verification Completed Successfully!', {
            position: "top-right",
            autoClose: 3000,
          });
        },
        onError: (error) => {
          console.error('Verification failed', error);
          toast.error(`Verification Failed: ${error.message}`, {
            position: "top-right",
            autoClose: 5000,
          });
          setRequestUrl('');
          setProofs([]);
        },
      });
    } catch (error) {
      console.error('Verification request error', error);
      toast.error(`Error Initiating Verification: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <ToastContainer />
      
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden border border-blue-100">
        {/* Header */}
        <div className="bg-blue-500 text-white p-6 text-center">
          <h1 className="text-2xl font-bold">Reclaim Protocol Verification</h1>
          <p className="text-sm text-blue-100 mt-2">
            Secure and privacy-preserving identity verification
          </p>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Verification Button */}
          <button 
            onClick={getVerificationReq} 
            disabled={isLoading}
            className={`
              w-full py-3 rounded-lg transition-all duration-300 ease-in-out 
              text-white font-semibold tracking-wider uppercase
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
              }
            `}
          >
            {isLoading ? 'Initiating Verification...' : 'Start Verification'}
          </button>

          {/* QR Code Section */}
          {requestUrl && (
            <div className="text-center space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-600 mb-3">
                  Scan QR Code to Complete Verification
                </p>
                <div className="flex justify-center">
                  <div className="p-2 bg-white rounded-xl shadow-md">
                    <QRCode 
                      value={requestUrl} 
                      size={256}
                      className="mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Proofs Display */}
          {proofs.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h2 className="text-lg font-bold text-green-700 mb-3">
                ✓ Verification Successful
              </h2>
              <pre className="bg-white p-3 rounded-md text-xs overflow-x-auto text-gray-800 shadow-inner">
                {JSON.stringify(proofs, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-blue-50 p-4 text-center text-xs text-blue-600">
          Powered by Reclaim Protocol
        </div>
      </div>
    </div>
  );
}

export default ReclaimDemo;