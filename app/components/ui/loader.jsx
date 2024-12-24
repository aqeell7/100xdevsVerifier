export function Loader({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <svg 
      className={`animate-spin ${sizeClasses[size]} ${className}`} 
      viewBox="0 0 24 24"
    ></svg>