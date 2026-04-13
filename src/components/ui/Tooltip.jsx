import React, { useState, useRef } from 'react';

/**
 * Tooltip Component
 * Hover tooltip with multiple positions
 * 
 * @param {ReactNode} children - Element to attach tooltip to
 * @param {string} content - Tooltip content
 * @param {string} position - Position: 'top', 'bottom', 'left', 'right'
 * @param {boolean} arrow - Show arrow
 * @param {number} delay - Show delay in ms
 * @param {string} className - Additional CSS classes
 */
const Tooltip = ({
  children,
  content,
  position = 'top',
  arrow = true,
  delay = 200,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowPositions = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isVisible && content && (
        <div
          className={`
            absolute z-50 ${positions[position]}
            px-3 py-2 bg-gray-900 text-white text-sm rounded
            whitespace-nowrap animate-fade-in
            ${className}
          `}
          role="tooltip"
        >
          {content}
          
          {arrow && (
            <div
              className={`
                absolute ${arrowPositions[position]}
                border-4 border-gray-900
              `}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Tooltip;