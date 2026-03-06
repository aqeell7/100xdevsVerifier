"use client"
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
import { Loader2, QrCode } from 'lucide-react';

function ReclaimDemo({ onVerificationSuccess }) {
  const [requestUrl, setRequestUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const getVerificationReq = async () => {
    setIsGenerating(true);
    try {
      const APP_ID = '0xf02a8Ac9acfA885399226a5ac876F574b9610eF4';
      const APP_SECRET = '0x7a24eeaea36722b0ba6c30fd314b10ce78c81355c1f9764fd72d76279adf0f90';
      const PROVIDER_ID = 'eacb5507-be7d-4f4c-9887-3a768e082d1a';

      const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID);
      const url = await reclaimProofRequest.getRequestUrl();

      setRequestUrl(url);

      await reclaimProofRequest.startSession({
        onSuccess: (proofs) => {
          console.log('Verification success', proofs);
          if (onVerificationSuccess) {
            onVerificationSuccess(proofs);
          }
        },
        onError: (error) => {
          console.error('Verification failed', error);
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {!requestUrl ? (
        <button
          onClick={getVerificationReq}
          disabled={isGenerating}
          className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-foreground text-background font-medium rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
        >
          <div className="absolute inset-0 w-full h-full bg-electric opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative z-10 flex items-center gap-2">
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <QrCode className="w-5 h-5" />
                Generate Verification QR
              </>
            )}
          </span>
        </button>
      ) : (
        <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-border/50">
            <QRCode value={requestUrl} size={200} className="rounded-lg" />
          </div>
          <p className="mt-6 text-sm text-muted-foreground max-w-sm text-center">
            Scan this QR code with your mobile device to verify your 100xDevs enrollment securely via Reclaim Protocol.
          </p>
        </div>
      )}
    </div>
  );
}

export default ReclaimDemo;
