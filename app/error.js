'use client'
export default function Error({ error, reset }) {
  return (
    <div className="grid place-items-center min-h-screen bg-gray-50 text-center p-4">
      <div>
        <h2 className="text-xl font-medium text-red-600 mb-4">Something went wrong</h2>
        <button 
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    </div>
  )
}