export function CardFooter({ className = '', children, ...props }) {
  return (
    <div 
      className={`p-6 pt-0 flex items-center ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
