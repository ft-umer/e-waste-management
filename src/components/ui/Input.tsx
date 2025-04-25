import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className = '', 
    label, 
    helperText, 
    error, 
    fullWidth = false,
    startIcon,
    endIcon,
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    const baseInputStyles = 'bg-white rounded-md border-gray-300 text-gray-900 focus:ring-green-500 focus:border-green-500 transition-all duration-200';
    const errorInputStyles = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '';
    const widthStyles = fullWidth ? 'w-full' : '';
    const iconPaddingLeft = startIcon ? 'pl-10' : '';
    const iconPaddingRight = endIcon ? 'pr-10' : '';
    
    const inputStyles = `${baseInputStyles} ${errorInputStyles} ${widthStyles} ${iconPaddingLeft} ${iconPaddingRight} ${className}`;
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label 
            htmlFor={inputId} 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {startIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              {startIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={inputStyles}
            {...props}
          />
          
          {endIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
              {endIcon}
            </div>
          )}
        </div>
        
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
        
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;