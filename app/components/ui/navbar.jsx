import React, { useState } from 'react';

export function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-transparent rounded-lg shadow-lg">
      {/* Left Section: Logo and Name */}
      <div className="flex items-center space-x-3">
        <img
          src="/logo.png" // Replace with your logo URL
          alt="100xdevsVerifier Logo"
          className="h-10 w-10 rounded-full hover:opacity-80 transition duration-200"
        />
        <span className="text-2xl font-bold text-gray-900">100xdevsVerifier</span>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden flex items-center text-gray-900 focus:outline-none"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="px-5 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
          Sign Up
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white rounded-lg shadow-lg mt-2 md:hidden">
          <div className="flex flex-col items-center space-y-2 py-3">
            <button className="px-5 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
