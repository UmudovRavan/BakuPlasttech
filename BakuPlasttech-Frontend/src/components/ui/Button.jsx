import React from 'react';
import '../../styles/ui.css';

const Button = ({ children, variant = 'primary', className = '', onClick, type = 'button' }) => {
  const variantClass = `btn-${variant}`;
  
  return (
    <button 
      type={type} 
      className={`btn ${variantClass} ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
