import React from 'react';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-transparent rounded-lg shadow-md">
      {/* Left Section: Logo and Name */}
      <div className="flex items-center space-x-2">
        <img
          src="/logo.png" // Replace with the actual logo URL
          alt="100xdevsVerifier Logo"
          className="h-8 w-8 rounded-full"
        />
        <span className="text-xl font-semibold text-gray-800">100xdevsVerifier</span>
      </div>

      {/* Right Section: Sign Up Button */}
      <div>
        <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
          Sign Up
        </button>
      </div>
    </nav>
  );
}
