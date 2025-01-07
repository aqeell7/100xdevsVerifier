import React from "react";
import { motion } from "framer-motion"; // Install with `npm install framer-motion`
import { Card } from "./Card"; // Import your Card component

export function LandingPageMainCard() {
  return (
    <div className="relative flex flex-col md:flex-row justify-center items-center min-h-screen bg-gradient-to-b from-blue-500 to-indigo-600 overflow-hidden">
      {/* Hero Image/Illustration */}
      <motion.img
        src="/hero-image.svg" // Replace with your image path
        alt="Hero Illustration"
        className="w-3/4 max-w-md md:max-w-lg lg:max-w-xl mb-12 md:mb-0 md:mr-12"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Card
          variant="elevated"
          className="text-center max-w-lg md:max-w-xl lg:max-w-2xl"
          padding="p-8 md:p-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-300 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            MySampleApp
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Transforming Ideas Into Beautiful Experiences.
          </p>
          <button
            className="mt-8 px-6 py-3 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 transition-all"
          >
            <span>Get Started</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </Card>
      </motion.div>
    </div>
  );
}

export default LandingPageMainCard;
