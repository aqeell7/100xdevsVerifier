export function Card({ 
  className = '', 
  children, 
  variant = 'default', 
  padding = 'p-4', 
  margin = '', 
  ...props 
}) {
  const variants = {
    default: 'bg-white shadow-lg',
    outlined: 'bg-white border border-gray-300',
    elevated: 'bg-white shadow-2xl',
  };

  return (
    <div 
      className={`rounded-xl ${variants[variant]} ${padding} ${margin} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
