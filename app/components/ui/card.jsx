export function Card({ 
  className = '', 
  children, 
  variant = 'default', 
  padding = 'p-4', 
  margin = '', 
  ...props 
}) {
  const variants = {
    default: 'bg-white shadow-lg dark:bg-gray-800 dark:text-white',
    outlined: 'bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white',
    elevated: 'bg-white shadow-2xl dark:bg-gray-800 dark:shadow-gray-900 dark:text-white',
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
