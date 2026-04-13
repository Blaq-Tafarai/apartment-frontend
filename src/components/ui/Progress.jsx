import React from 'react';

/**
 * Progress Component
 * Progress bar with multiple styles
 * 
 * @param {number} value - Progress value (0-100)
 * @param {number} max - Maximum value
 * @param {string} variant - Style variant: 'default', 'gradient', 'striped', 'animated'
 * @param {string} color - Color theme
 * @param {string} size - Size: 'sm', 'md', 'lg'
 * @param {boolean} showLabel - Show percentage label
 * @param {string} label - Custom label
 * @param {string} className - Additional CSS classes
 */
const Progress = ({
  value = 0,
  max = 100,
  variant = 'default',
  color = 'primary',
  size = 'md',
  showLabel = false,
  label,
  className = '',
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const colors = {
    primary: 'bg-primary',
    success: 'bg-success',
    danger: 'bg-danger',
    warning: 'bg-warning',
    info: 'bg-info',
  };

  const gradientColors = {
    primary: 'from-blue-400 to-blue-600',
    success: 'from-green-400 to-green-600',
    danger: 'from-red-400 to-red-600',
    warning: 'from-yellow-400 to-yellow-600',
    info: 'from-sky-400 to-sky-600',
  };

  let barClasses = `h-full rounded-full transition-all duration-300 ${colors[color]}`;

  if (variant === 'gradient') {
    barClasses = `h-full rounded-full transition-all duration-300 bg-gradient-to-r ${gradientColors[color]}`;
  } else if (variant === 'striped') {
    barClasses += ' bg-striped';
  } else if (variant === 'animated') {
    barClasses += ' bg-striped animate-progress';
  }

  return (
    <div className={className}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-text-primary">
            {label || 'Progress'}
          </span>
          {showLabel && (
            <span className="text-sm font-medium text-text-secondary">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        {...props}
      >
        <div
          className={barClasses}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

/**
 * CircularProgress Component
 * Circular/radial progress indicator
 */
export const CircularProgress = ({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 8,
  color = 'primary',
  showLabel = true,
  label,
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const colors = {
    primary: '#3b82f6',
    success: '#22c55e',
    danger: '#ef4444',
    warning: '#f59e0b',
    info: '#0ea5e9',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors[color]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>

      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-text-primary">
            {Math.round(percentage)}%
          </span>
          {label && (
            <span className="text-sm text-text-secondary mt-1">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * SteppedProgress Component
 * Multi-step progress indicator
 */
export const SteppedProgress = ({
  steps = [],
  currentStep = 0,
  color = 'primary',
  orientation = 'horizontal',
  className = '',
}) => {
  const colors = {
    primary: 'bg-primary border-primary text-primary',
    success: 'bg-success border-success text-success',
    danger: 'bg-danger border-danger text-danger',
    warning: 'bg-warning border-warning text-warning',
    info: 'bg-info border-info text-info',
  };

  return (
    <div
      className={`
        flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row items-center'}
        ${className}
      `}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;

        return (
          <React.Fragment key={index}>
            {/* Step */}
            <div
              className={`
                flex ${orientation === 'vertical' ? 'flex-row' : 'flex-col'}
                items-center gap-2
              `}
            >
              {/* Circle */}
              <div
                className={`
                  w-10 h-10 rounded-full border-2 flex items-center justify-center
                  font-semibold transition-all
                  ${isCompleted ? `${colors[color]} text-white` : ''}
                  ${isCurrent ? `border-${color} ${colors[color].split(' ')[2]}` : ''}
                  ${isUpcoming ? 'border-gray-300 text-gray-400' : ''}
                `}
              >
                {isCompleted ? '✓' : index + 1}
              </div>

              {/* Label */}
              <span
                className={`
                  text-sm font-medium
                  ${isCurrent ? colors[color].split(' ')[2] : ''}
                  ${isUpcoming ? 'text-gray-400' : 'text-text-primary'}
                `}
              >
                {step.label || step}
              </span>
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div
                className={`
                  ${orientation === 'vertical' ? 'h-8 w-0.5 ml-5' : 'flex-1 h-0.5'}
                  ${isCompleted ? colors[color].split(' ')[0] : 'bg-gray-300'}
                  transition-all
                `}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Add CSS for striped animation
const progressStyles = `
.bg-striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

@keyframes progress {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 1rem 0;
  }
}

.animate-progress {
  animation: progress 1s linear infinite;
}
`;

export default Progress;