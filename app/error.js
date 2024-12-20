'use client'

export default function Error({ error, reset }) {
  return (
    <div className="grid place-items-center min-h-screen bg-white text-center p-4">
      <div>
        {/* Enhanced Error Icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8 text-rose-500 mb-4" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M18 10A8 8 0 112 10a8 8 0 0116 0zm-8-4a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 0010 6zm0 7a.75.75 0 100 1.5.75.75 0 000-1.5z" 
            clipRule="evenodd" 
          />
        </svg>

        <h2 className="text-lg font-medium text-rose-500 mb-4">Oops! Something went wrong</h2>

        <button 
          onClick={reset}
          className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded shadow-sm hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
