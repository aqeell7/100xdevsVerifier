'use client'
import React, { 
  useState, 
  useCallback, 
  useMemo, 
  useRef, 
  Suspense, 
  lazy 
} from 'react';
import dynamic from 'next/dynamic';
import { 
  usePerformanceOptimization, 
  useErrorHandler 
} from '@/hooks/optimization-hooks';

// Dynamically import heavy components
const QRCode = dynamic(() => import('react-qr-code'), {
  loading: () => <div className="w-64 h-64 bg-gray-200 animate-pulse"></div>,
  ssr: false
});

const ToastContainer = dynamic(() => 
  import('react-toastify').then(mod => mod.ToastContainer),
  { ssr: false }
);

// Performance-optimized Reclaim Verification Component
function ReclaimDemo() {
  // Performance Tracking Hooks
  const { 
    trackRender, 
    trackOperation 
  } = usePerformanceOptimization('ReclaimDemo');

  // Error Handling Hook
  const { 
    handleError, 
    ErrorFallback 
  } = useErrorHandler();

  // Refs for memoization and performance
  const reclaimRequestRef = useRef<any>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Optimized State Management
  const [verificationState, setVerificationState] = useState({
    requestUrl: '',
    proofs: [],
    status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
    error: null
  });

  // Memoized Verification Request
  const getVerificationReq = useCallback(async () => {
    // Start performance tracking
    const startTime = performance.now();

    // Create abort controller for request cancellation
    abortControllerRef.current = new AbortController();

    try {
      // Update state with loading status
      setVerificationState(prev => ({
        ...prev, 
        status: 'loading', 
        error: null
      }));

      // Validate environment variables
      if (!process.env.NEXT_PUBLIC_APP_ID) {
        throw new Error('Missing Reclaim Protocol credentials');
      }

      // Use memoized request instance
      if (!reclaimRequestRef.current) {
        reclaimRequestRef.current = await ReclaimProofRequest.init(
          process.env.NEXT_PUBLIC_APP_ID,
          process.env.NEXT_PUBLIC_APP_SECRET,
          process.env.NEXT_PUBLIC_PROVIDER_ID
        );
      }

      // Generate verification URL with timeout
      const requestUrl = await Promise.race([
        reclaimRequestRef.current.getRequestUrl(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request Timeout')), 10000)
        )
      ]);

      // Start session with optimized handling
      await reclaimRequestRef.current.startSession({
        onSuccess: (proofs) => {
          setVerificationState(prev => ({
            ...prev,
            status: 'success',
            proofs,
            requestUrl
          }));

          // Track operation performance
          trackOperation('verification_success', performance.now() - startTime);
        },
        onError: (error) => {
          setVerificationState(prev => ({
            ...prev,
            status: 'error',
            error: error.message
          }));

          // Track operation performance
          trackOperation('verification_error', performance.now() - startTime);
        },
        signal: abortControllerRef.current?.signal
      });
    } catch (error) {
      // Centralized error handling
      handleError(error);
      
      setVerificationState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  }, [handleError, trackOperation]);

  // Memoized derived values
  const verificationDetails = useMemo(() => {
    if (verificationState.status === 'success') {
      return {
        totalProofs: verificationState.proofs.length,
        verificationTime: new Date().toLocaleString()
      };
    }
    return null;
  }, [verificationState.status, verificationState.proofs]);

  // Render optimization
  const renderContent = useCallback(() => {
    switch(verificationState.status) {
      case 'loading':
        return (
          <div className="animate-pulse">
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
        );
      case 'success':
        return (
          <div className="space-y-4">
            {verificationState.requestUrl && (
              <div className="flex justify-center">
                <QRCode value={verificationState.requestUrl} />
              </div>
            )}
            {verificationDetails && (
              <div>
                <p>Proofs: {verificationDetails.totalProofs}</p>
                <p>Verified at: {verificationDetails.verificationTime}</p>
              </div>
            )}
          </div>
        );
      case 'error':
        return (
          <div className="text-red-500">
            {verificationState.error}
          </div>
        );
      default:
        return null;
    }
  }, [verificationState, verificationDetails]);

  // Render with performance tracking
  trackRender();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto">
        <button 
          onClick={getVerificationReq}
          disabled={verificationState.status === 'loading'}
          className="w-full btn btn-primary"
        >
          {verificationState.status === 'loading' 
            ? 'Verifying...' 
            : 'Start Verification'}
        </button>

        {renderContent()}

        <ToastContainer />
        
        {/* Error Boundary Fallback */}
        <ErrorFallback />
      </div>
    </Suspense>
  );
}

export default React.memo(ReclaimDemo);