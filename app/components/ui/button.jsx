export function Button({ 
  className = '', 
  variant = 'default', 
  size = 'md', 
  isLoading = false, 
  disabled = false, 
  children, 
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-gray-900 text-white hover:bg-gray-800',
  };

  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-11 px-8 text-lg',
  };

  return (
    <button
      className={`
        ${baseStyles} 
        ${variants[variant] || variants.default} 
        ${sizes[size] || sizes.md} 
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader size="sm" className="mr-2" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
