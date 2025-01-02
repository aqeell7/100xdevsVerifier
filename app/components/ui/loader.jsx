export function Loader({ size = 'md', animationDuration = '1s', className = '' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  if (variant === 'dots') {
    return (
      <div
        className={`flex space-x-1 items-center ${className}`}
        style={{ animationDuration }}
      >
        <div
          className={`${sizeClasses[size] || sizeClasses.md} bg-current rounded-full animate-bounce`}
          style={{ animationDuration }}
        ></div>
        <div
          className={`${sizeClasses[size] || sizeClasses.md} bg-current rounded-full animate-bounce`}
          style={{ animationDuration: `calc(${animationDuration} * 1.2)` }}
        ></div>
        <div
          className={`${sizeClasses[size] || sizeClasses.md} bg-current rounded-full animate-bounce`}
          style={{ animationDuration: `calc(${animationDuration} * 1.4)` }}
        ></div>
      </div>
    );
  }

  return (
    <svg
      className={`animate-spin ${sizeClasses[size] || sizeClasses.md} ${className}`}
      style={{ animationDuration }}
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
