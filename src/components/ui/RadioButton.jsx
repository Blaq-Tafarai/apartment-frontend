import React from 'react';

/**
 * RadioButton Component
 * 
 * @param {boolean} checked - Checked state
 * @param {function} onChange - Change handler
 * @param {boolean} disabled - Disabled state
 * @param {string} size - Size: 'sm', 'md', 'lg'
 * @param {string} variant - Color variant
 * @param {string} label - Label text
 * @param {string} description - Description text
 * @param {string} name - Radio group name
 * @param {string} value - Radio value
 */
const RadioButton = ({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  variant = 'primary',
  label,
  description,
  name,
  value,
  className = '',
  ...props
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  const variants = {
    primary: 'border-primary bg-primary',
    success: 'border-success bg-success',
    danger: 'border-danger bg-danger',
    warning: 'border-warning bg-warning',
    info: 'border-info bg-info',
  };

  const handleChange = (e) => {
    if (!disabled) {
      onChange?.(e.target.value, e);
    }
  };

  const radioElement = (
    <div className="relative flex items-center">
      <input
        type="radio"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        name={name}
        value={value}
        className="sr-only peer"
        {...props}
      />
      <div
        className={`
          ${sizes[size]}
          border-2 rounded-full transition-all duration-200
          flex items-center justify-center
          ${
            checked
              ? variants[variant]
              : 'border-gray-300 bg-white hover:border-gray-400'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-${variant}
        `}
      >
        {checked && (
          <div className={`${dotSizes[size]} bg-white rounded-full`} />
        )}
      </div>
    </div>
  );

  if (!label && !description) {
    return radioElement;
  }

  return (
    <label
      className={`flex items-start gap-3 ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
    >
      {radioElement}
      <div className="flex-1 flex flex-col">
        {label && (
          <span
            className={`text-sm font-medium text-text-primary ${
              disabled ? 'opacity-50' : ''
            }`}
          >
            {label}
          </span>
        )}
        {description && (
          <span
            className={`text-xs text-text-secondary mt-0.5 ${
              disabled ? 'opacity-50' : ''
            }`}
          >
            {description}
          </span>
        )}
      </div>
    </label>
  );
};

/**
 * RadioGroup Component - Manages a group of radio buttons
 */
export const RadioGroup = ({
  options = [],
  value,
  onChange,
  name,
  disabled = false,
  size = 'md',
  variant = 'primary',
  orientation = 'vertical',
  className = '',
}) => {
  return (
    <div
      className={`
        flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'} 
        gap-3 ${className}
      `}
      role="radiogroup"
    >
      {options.map((option) => (
        <RadioButton
          key={option.value}
          checked={value === option.value}
          onChange={(val) => onChange?.(val)}
          name={name}
          value={option.value}
          label={option.label}
          description={option.description}
          disabled={disabled || option.disabled}
          size={size}
          variant={variant}
        />
      ))}
    </div>
  );
};

export default RadioButton;