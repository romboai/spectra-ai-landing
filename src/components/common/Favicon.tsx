import React from 'react';
// Import favicon using URL import syntax for better Vite handling
import favicon from '/src/assets/images/favicon.svg';

interface FaviconProps {
  size?: number;
  className?: string;
}

const Favicon: React.FC<FaviconProps> = ({ size = 24, className = '' }) => {
  return (
    <img 
      src={favicon} 
      alt="SpectraAI" 
      width={size} 
      height={size} 
      className={className} 
    />
  );
};

export default Favicon; 