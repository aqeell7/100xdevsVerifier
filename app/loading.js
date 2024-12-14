export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* Loading Spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 mb-4"></div>
      {/* Loading Icon */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 text-blue-500" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M12 2.25v1.5M12 20.25v1.5M4.219 4.219l1.061 1.061M18.72 18.72l1.061 1.061M2.25 12h1.5M20.25 12h1.5M4.219 19.781l1.061-1.061M18.72 5.28l1.061-1.061" 
        />
      </svg>
    </div>
  )
}
