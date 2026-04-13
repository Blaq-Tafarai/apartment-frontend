import React from 'react';
import { Check, Minus } from 'lucide-react';

/**
 * Checkbox Component
 * 
 * @param {boolean} checked - Checked state
 * @param {function} onChange - Change handler
 * @param {boolean} indeterminate - Indeterminate state (for parent checkboxes)
 * @param {boolean} disabled - Disabled state
 * @param {string} size - Size: 'sm', 'md', 'lg'
 * @param {string} variant - Color variant: 'primary', 'success', 'danger', 'warning'
 * @param {string} label - Label text
 * @param {string} description - Description text
 * @param {string} error - Error message
 * @param {boolean} required - Required field
 * @param {string} name - Input name
 * @param {string} value - Input value
 */
const Checkbox = ({
  checked = false,
  onChange,
  indeterminate = false,
  disabled = false,
  size = 'md',
  variant = 'primary',
  label,
  description,
  error,
  required = false,
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

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
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
      onChange?.(e.target.checked, e);
    }
  };

  const checkboxElement = (
    <div className="relative flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        name={name}
        value={value}
        required={required}
        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
        ref={(input) => {
          if (input) {
            input.indeterminate = indeterminate;
          }
        }}
        {...props}
      />
      <div
        className={`
          ${sizes[size]}
          border-2 rounded transition-all duration-200
          flex items-center justify-center
          ${
            checked || indeterminate
              ? variants[variant]
              : 'border-gray-300 bg-white hover:border-gray-400'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${error ? 'border-danger' : ''}
          focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-${variant}
        `}
      >
        {checked && !indeterminate && (
          <Check className={`${iconSizes[size]} text-white stroke-[3]`} />
        )}
        {indeterminate && (
          <Minus className={`${iconSizes[size]} text-white stroke-[3]`} />
        )}
      </div>
    </div>
  );

  if (!label && !description) {
    return checkboxElement;
  }

  return (
    <label
      className={`flex items-start gap-3 ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
    >
      {checkboxElement}
      <div className="flex-1 flex flex-col">
        {label && (
          <span
            className={`text-sm font-medium text-text-primary ${
              disabled ? 'opacity-50' : ''
            }`}
          >
            {label}
            {required && <span className="text-danger ml-1">*</span>}
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
        {error && (
          <span className="text-xs text-danger mt-1">{error}</span>
        )}
      </div>
    </label>
  );
};

export default Checkbox;