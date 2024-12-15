'use client'
import React, { useState, useCallback, useMemo } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import dynamic from 'next/dynamic';

// Dynamically import heavy components
const QRCode = dynamic(() => import('react-qr-code'), { ssr: false });

function ReclaimVerificationDemo() {
  // Consolidated state management with more robust initial state
  const [state, setState] = useState({
    requestUrl: '',
    proofs: [],
    status: 'idle',
    error: null
  });

  // Enhanced verification request with improved error handling
  const initiateVerification = useCallback(async () => {
    // Validate environment variables upfront
    const requiredEnvs = ['NEXT_PUBLIC_APP_ID', 'NEXT_PUBLIC_APP_SECRET', 'NEXT_PUBLIC_PROVIDER_ID'];
    const missingEnvs = requiredEnvs.filter(env => !process.env[env]);
    
    if (missingEnvs.length) {
      toast.error(`Missing environment variables: ${missingEnvs.join(', ')}`);
      return;
    }

    setState(prev => ({ ...prev, status: 'loading', error: null }));

    try {
      const reclaimRequest = await ReclaimProofRequest.init(
        process.env.NEXT_PUBLIC_APP_ID,
        process.env.APP_SECRET,
        process.env.PROVIDER_ID
      );

      const requestUrl = await reclaimRequest.getRequestUrl();

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
      setState({
        status: 'error',
        requestUrl: '',
        proofs: [],
        error: error.message || 'Unknown error'
      });
      toast.error('Verification process failed');
    }
  }, []);

  // Memoized verification details with more concise logic
  const verificationDetails = useMemo(() => 
    state.status === 'success' 
      ? {
          proofCount: state.proofs.length,
          verifiedAt: new Date().toLocaleString()
        } 
      : null, 
    [state.status, state.proofs]
  );

  // Simplified rendering logic with early returns
  const renderVerificationContent = () => {
    const contentMap = {
      loading: <div className="animate-pulse">Verifying...</div>,
      success: (
        <div className="space-y-4">
          {state.requestUrl && <QRCode value={state.requestUrl} />}
          {verificationDetails && (
            <div className="text-center">
              <p>Proofs: {verificationDetails.proofCount}</p>
              <p>Verified: {verificationDetails.verifiedAt}</p>
            </div>
          )}
        </div>
      ),
      error: (
        <div className="text-red-500 text-center">
          {state.error || 'Verification Failed'}
        </div>
      )
    };

    return contentMap[state.status] || null;
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

export default React.memo(ReclaimVerificationDemo);

