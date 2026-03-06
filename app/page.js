'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Lock, ShieldCheck, Github } from 'lucide-react';
import ReclaimDemo from './components/Verification';
import MintNFT from './components/MintNft';
import { ThemeToggle } from './components/theme-toggle';

export default function MainPage() {
  const [isVerified, setIsVerified] = useState(false);
  const [verificationProofs, setVerificationProofs] = useState(null);

  const handleVerificationSuccess = (proofs) => {
    setIsVerified(true);
    setVerificationProofs(proofs);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-electric selection:text-white relative overflow-hidden flex flex-col items-center">
      {/* Background patterns */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-electric/20 via-background to-background opacity-50 dark:opacity-20 pointer-events-none"></div>

      {/* Grid subtle background */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <nav className="w-full relative z-10 flex items-center justify-between p-6 max-w-6xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-foreground text-background dark:bg-electric dark:text-white flex items-center justify-center font-bold font-heading text-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:shadow-[0_0_15px_rgba(var(--electric),0.4)] transition-all hover:scale-105">
            100x
          </div>
          <span className="font-heading font-semibold text-xl tracking-tight hidden sm:block">Devs Verifier</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden sm:inline-flex text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted">
            Documentation
          </a>
          <a href="https://github.com/100xdevs-verifier" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg">
            <Github className="w-5 h-5" />
          </a>
          <ThemeToggle />
        </div>
      </nav>

      <main className="w-full relative z-10 flex flex-col items-center flex-grow p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto flex flex-col items-center text-center mt-12 sm:mt-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric/10 text-electric text-sm font-medium mb-8 border border-electric/20 backdrop-blur-md"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Zero-Knowledge Verification</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-heading mb-6 tracking-tighter leading-[1.1]">
            Prove your skills.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">
              Claim your legacy.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-16 max-w-2xl font-medium leading-relaxed px-4">
            Verify your 100xDevs course completion using advanced cryptography and mint your exclusive on-chain proof-of-knowledge NFT.
          </p>

          <div className="w-full max-w-[440px] glass-panel rounded-[2rem] p-8 sm:p-10 relative group mb-16">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-[2rem] pointer-events-none" />

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {isVerified ? (
                  <motion.div
                    key="mint"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 bg-electric/10 text-electric rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-electric/20">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold font-heading mb-3 tracking-tight">Identity Confirmed</h2>
                    <p className="text-muted-foreground mb-8 text-[15px] leading-relaxed">
                      Verification successful. You are now eligible to mint your exclusive 100xDevs badge.
                    </p>

                    <MintNFT verificationSuccessful={isVerified} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="verify"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-16 h-16 bg-muted/50 text-muted-foreground rounded-2xl flex items-center justify-center mb-6 border border-border shadow-inner">
                      <Lock className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold font-heading mb-3 tracking-tight">Step 1: Authorization</h2>
                    <p className="text-muted-foreground mb-8 text-[15px] leading-relaxed">
                      Connect with Reclaim Protocol to securely prove your course access without exposing your data.
                    </p>

                    <ReclaimDemo onVerificationSuccess={handleVerificationSuccess} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="w-full relative z-10 border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
        <p>Fast-shipping full-stack developer ⚡ Built with precision.</p>
      </footer>
    </div>
  );
}