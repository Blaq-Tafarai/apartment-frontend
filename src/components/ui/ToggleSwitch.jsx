import React from 'react';

/**
 * ToggleSwitch Component
 * 
 * @param {boolean} checked - Current state of the toggle
 * @param {function} onChange - Callback function when toggle changes
 * @param {boolean} disabled - Disable the toggle
 * @param {string} size - Size variant: 'sm', 'md', 'lg'
 * @param {string} variant - Color variant: 'primary', 'success', 'danger', 'warning'
 * @param {string} label - Label text
 * @param {string} description - Description text below label
 * @param {string} labelPosition - Label position: 'left', 'right'
 * @param {boolean} showIcons - Show check/x icons inside toggle
 * @param {string} className - Additional CSS classes
 * @param {string} name - Input name attribute
 * @param {boolean} loading - Show loading state
 */
const ToggleSwitch = ({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  variant = 'primary',
  label,
  description,
  labelPosition = 'right',
  showIcons = false,
  className = '',
  name,
  loading = false,
  onColor,
  offColor,
  ...props
}) => {
  const sizes = {
    sm: {
      switch: 'w-8 h-5',
      slider: 'w-3 h-3',
      translate: 'translate-x-3',
      padding: 'p-0.5',
      icon: 'w-2 h-2',
    },
    md: {
      switch: 'w-11 h-6',
      slider: 'w-4 h-4',
      translate: 'translate-x-5',
      padding: 'p-1',
      icon: 'w-3 h-3',
    },
    lg: {
      switch: 'w-14 h-7',
      slider: 'w-5 h-5',
      translate: 'translate-x-7',
      padding: 'p-1',
      icon: 'w-4 h-4',
    },
  };

  const variants = {
    primary: 'bg-primary',
    success: 'bg-success',
    danger: 'bg-danger',
    warning: 'bg-warning',
    info: 'bg-info',
  };

  const currentSize = sizes[size];
  const activeColor = onColor || variants[variant];

  const handleToggle = () => {
    if (!disabled && !loading) {
      onChange?.(!checked);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  const toggleElement = (
    <div
      className={`
        relative inline-flex ${currentSize.switch} ${currentSize.padding}
        rounded-full transition-colors duration-300 ease-in-out cursor-pointer
        ${checked ? (activeColor || 'bg-primary') : (offColor || 'bg-gray-300')}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${loading ? 'opacity-70' : ''}
      `}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {/* Slider */}
      <span
        className={`
          ${currentSize.slider}
          inline-block rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out
          ${checked ? currentSize.translate : 'translate-x-0'}
          flex items-center justify-center
        `}
      >
        {loading && (
          <svg
            className={`animate-spin ${currentSize.icon} text-gray-400`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
      </span>

      {/* Icons */}
      {showIcons && !loading && (
        <>
          {checked ? (
            <svg
              className={`absolute left-1.5 ${currentSize.icon} text-white`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg
              className={`absolute right-1.5 ${currentSize.icon} text-gray-400`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </>
      )}

      {/* Hidden input for form compatibility */}
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {}}
        disabled={disabled}
        name={name}
        className="sr-only"
        {...props}
      />
    </div>
  );

  const labelElement = (label || description) && (
    <div className="flex flex-col">
      {label && (
        <span className={`text-sm font-medium text-text-primary ${disabled ? 'opacity-50' : ''}`}>
          {label}
        </span>
      )}
      {description && (
        <span className={`text-xs text-text-secondary ${disabled ? 'opacity-50' : ''}`}>
          {description}
        </span>
      )}
    </div>
  );

  if (!label && !description) {
    return toggleElement;
  }

  return (
    <label
      className={`flex items-center gap-3 cursor-pointer ${
        disabled ? 'cursor-not-allowed' : ''
      } ${className}`}
    >
      {labelPosition === 'left' && labelElement}
      {toggleElement}
      {labelPosition === 'right' && labelElement}
    </label>
  );
};

export default ToggleSwitch;