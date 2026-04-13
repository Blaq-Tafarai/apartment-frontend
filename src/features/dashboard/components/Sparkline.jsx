import React from 'react';

const Sparkline = ({ data = [], color = 'rgb(var(--primary))', className = '' }) => {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = ((value - min) / range) * 100;
    return `${x}% ${100 - y}%`;
  }).join(', ');

  return (
    <svg 
      viewBox="0 0 100 20" 
      className={`w-full h-5 ${className}`}
      preserveAspectRatio="none"
    >
      <polyline 
        points={points} 
        fill="none" 
        stroke={color} 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="3,2"
      />
    </svg>
  );
};

export default Sparkline;
