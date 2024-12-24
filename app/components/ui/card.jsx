export function Card({ className = '', children, ...props }) {
  return (
    <div 
      className={`bg-white rounded-xl shadow-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}