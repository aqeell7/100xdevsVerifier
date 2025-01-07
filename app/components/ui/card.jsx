import React from "react";
import { motion } from "framer-motion"; // Install with `npm install framer-motion`
import { Card } from "./Card"; // Import your Card component

export function LandingPageMainCard() {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-blue-500 to-indigo-600 text-gray-800 dark:text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative flex flex-col md:flex-row justify-center items-center w-full max-w-7xl px-6 md:px-12 lg:px-20">
        {/* Hero Image */}
        <motion.img
          src="/hero-image.svg" // Replace with your image path
          alt="Hero Illustration"
          className="w-3/4 max-w-sm md:max-w-md lg:max-w-lg mb-8 md:mb-0 md:mr-12"
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

      {/* Features Section */}
      <div className="mt-16 w-full bg-white dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Why Choose <span className="text-blue-500">MySampleApp?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="text-blue-500 text-5xl mb-4">🚀</div>
              <h3 className="font-bold text-xl mb-2">Fast and Reliable</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Experience blazing fast performance that scales with your needs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="text-green-500 text-5xl mb-4">🔒</div>
              <h3 className="font-bold text-xl mb-2">Secure by Design</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your data is always safe with our advanced security protocols.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="text-purple-500 text-5xl mb-4">🌟</div>
              <h3 className="font-bold text-xl mb-2">User-Friendly</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Intuitive design ensures a smooth experience for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPageMainCard;
