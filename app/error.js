'use client'

export default function Error({ error }) {
  return (
    <div className="grid place-items-center min-h-screen bg-gray-50 text-center p-4">
      <div>
        {/* Minimal Error Icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8 text-red-600 mb-4" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M18 10A8 8 0 112 10a8 8 0 0116 0zm-8-4a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 0010 6zm0 7a.75.75 0 100 1.5.75.75 0 000-1.5z" 
            clipRule="evenodd" 
          />
        </svg>

        <h2 className="text-lg font-medium text-red-600 mb-4">Something went wrong</h2>

       
      </div>
    </div>
  )
}
