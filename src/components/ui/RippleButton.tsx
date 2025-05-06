
import React, { useState, useEffect } from 'react';

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

interface RipplePosition {
  x: number;
  y: number;
  id: number;
}

const RippleButton = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '',
  ...props 
}: RippleButtonProps) => {
  const [ripples, setRipples] = useState<RipplePosition[]>([]);
  
  // Remove ripple effect after animation completes
  useEffect(() => {
    const timeoutIds: NodeJS.Timeout[] = [];
    
    ripples.forEach((ripple) => {
      const timeoutId = setTimeout(() => {
        setRipples((prevRipples) => 
          prevRipples.filter((prevRipple) => prevRipple.id !== ripple.id)
        );
      }, 1000); // Animation duration
      
      timeoutIds.push(timeoutId);
    });
    
    return () => {
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [ripples]);
  
  // Handle ripple effect on click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipples([...ripples, { x, y, id: Date.now() }]);
    
    if (props.onClick) {
      props.onClick(e);
    }
  };
  
  // Styles based on variant and size
  const variantStyles = {
    default: 'bg-secondary text-white hover:bg-secondary/80',
    outline: 'bg-transparent border border-white/20 text-white hover:bg-white/5',
    accent: 'bg-accent text-white hover:bg-accent/80',
  };
  
  const sizeStyles = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };
  
  return (
    <button
      className={`relative overflow-hidden rounded-lg font-medium transition-all duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '10px',
            height: '10px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default RippleButton;
