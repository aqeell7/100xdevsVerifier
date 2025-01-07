import React from "react";
import { motion } from "framer-motion"; // For animations, install this with `npm install framer-motion`
import { Card } from "./Card"; // Import your Card component

export function LandingPageMainCard() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-500 to-indigo-600">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Card
          variant="elevated"
          className="text-center max-w-lg md:max-w-xl lg:max-w-2xl"
          padding="p-8 md:p-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white">
            <span className="text-blue-500 dark:text-blue-400">MySampleApp</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Your journey begins here with style.
          </p>
          <button
            className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 transition-all"
          >
            Get Started
          </button>
        </Card>
      </motion.div>
    </div>
  );
}
