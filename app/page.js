'use client'
import React, { 
  useState, 
  useCallback, 
  useMemo, 
  useRef 
} from 'react';
import dynamic from 'next/dynamic';
import { toast, ToastContainer } from 'react-toastify';

/**
 * Reclaim Protocol Identity Verification Component
 * 
 * @description
 * This component provides a streamlined, secure identity verification process using Reclaim Protocol.
 * 
 * Key Features:
 * - Dynamic QR Code generation for identity verification
 * - Comprehensive error handling
 * - Performance-optimized state management
 * - Real-time verification status tracking
 * 
 * Workflow:
 * 1. User initiates verification
 * 2. QR Code generated for mobile verification
 * 3. Proofs collected and displayed upon successful verification
 * 
 * @requires 
 * - Reclaim Protocol SDK
 * - react-toastify for notifications
 * - Tailwind CSS for styling
 */
function ReclaimVerificationDemo() {
  // Verification state management
  const [state, setState] = useState({
    requestUrl: '',
    proofs: [],
    status: 'idle' as 'idle' | 'loading' | 'success' | 'error',
    error: null as string | null
  });

  // Memoized verification request handler
  const initiateVerification = useCallback(async () => {
    // Reset state and prepare for new verification
    setState(prev => ({ ...prev, status: 'loading', error: null }));

    try {
      // Validate and initialize Reclaim Protocol
      if (!process.env.NEXT_PUBLIC_APP_ID) {
        throw new Error('Missing Reclaim Protocol credentials');
      }

      // Generate verification request
      const reclaimRequest = await ReclaimProofRequest.init(
        process.env.NEXT_PUBLIC_APP_ID,
        process.env.NEXT_PUBLIC_APP_SECRET,
        process.env.NEXT_PUBLIC_PROVIDER_ID
      );

      const requestUrl = await reclaimRequest.getRequestUrl();

      // Start verification session
      await reclaimRequest.startSession({
        onSuccess: (proofs) => {
          setState({
            status: 'success',
            proofs,
            requestUrl,
            error: null
          });
          toast.success('Verification Completed Successfully!');
        },
        onError: (error) => {
          setState(prev => ({
            ...prev,
            status: 'error',
            error: error.message
          }));
          toast.error(`Verification Failed: ${error.message}`);
        }
      });
    } catch (error) {
      // Handle unexpected errors
      setState({
        status: 'error',
        requestUrl: '',
        proofs: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      toast.error('Verification process encountered an error');
    }
  }, []);

  // Memoized verification details
  const verificationDetails = useMemo(() => {
    if (state.status === 'success') {
      return {
        proofCount: state.proofs.length,
        verifiedAt: new Date().toLocaleString()
      };
    }
    return null;
  }, [state.status, state.proofs]);

  // Render based on verification status
  const renderVerificationContent = () => {
    switch (state.status) {
      case 'loading':
        return <div className="animate-pulse">Verifying...</div>;
      case 'success':
        return (
          <div className="space-y-4">
            {state.requestUrl && (
              <div className="flex justify-center">
                <QRCode value={state.requestUrl} />
              </div>
            )}
            {verificationDetails && (
              <div className="text-center">
                <p>Proofs Collected: {verificationDetails.proofCount}</p>
                <p>Verified at: {verificationDetails.verifiedAt}</p>
              </div>
            )}
          </div>
        );
      case 'error':
        return (
          <div className="text-red-500 text-center">
            {state.error || 'Verification Failed'}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      <button 
        onClick={initiateVerification}
        disabled={state.status === 'loading'}
        className={`
          w-full p-3 rounded-lg transition-all 
          ${state.status === 'loading' 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
          }
        `}
      >
        {state.status === 'loading' ? 'Verifying...' : 'Start Verification'}
      </button>

      {renderVerificationContent()}
      <ToastContainer />
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default React.memo(ReclaimVerificationDemo);