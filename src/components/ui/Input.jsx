import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-5 py-3 text-lg',
};

/**
 * Input Component
 * Versatile input field with multiple features
 *
 * @param {string} type - Input type
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {string} label - Label text
 * @param {string} description - Helper text
 * @param {string} error - Error message
 * @param {boolean} disabled - Disabled state
 * @param {boolean} readOnly - Read-only state
 * @param {boolean} required - Required field
 * @param {ReactNode} leftIcon - Icon on the left
 * @param {ReactNode} rightIcon - Icon on the right
 * @param {string} leftAddon - Text addon on the left
 * @param {string} rightAddon - Text addon on the right
 * @param {boolean} clearable - Show clear button
 * @param {string} size - Size: 'sm', 'md', 'lg'
 * @param {string} name - Input name
 * @param {string} className - Additional CSS classes
 */
const Input = React.forwardRef(({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  description,
  error,
  disabled = false,
  readOnly = false,
  required = false,
  leftIcon,
  rightIcon,
  leftAddon,
  rightAddon,
  clearable = false,
  size = 'md',
  name,
  className = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClear = () => {
    onChange?.({ target: { value: '', name } });
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const hasLeftElement = leftIcon || leftAddon;
  const hasRightElement = rightIcon || rightAddon || (clearable && value) || type === 'password';

  // Generate IDs for accessibility
  const descriptionId = description ? `input-desc-${Math.random().toString(36).substr(2, 9)}` : null;
  const errorId = error ? `input-error-${Math.random().toString(36).substr(2, 9)}` : null;
  const ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={className}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative flex items-center">
        {/* Left Addon */}
        {leftAddon && (
          <span className="inline-flex items-center px-3 bg-surface-variant border border-r-0 border-border-color rounded-l-default text-text-secondary text-sm">
            {leftAddon}
          </span>
        )}

        {/* Input Wrapper */}
        <div className="relative flex-1">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            name={name}
            aria-describedby={ariaDescribedBy}
            className={`
              w-full bg-surface border rounded-default
              text-text-primary placeholder-text-tertiary
              focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
              read-only:bg-surface-variant read-only:cursor-default
              transition-all duration-300
              ${sizes[size]}
              ${error ? 'border-danger focus:ring-danger' : 'border-border-color'}
              ${hasLeftElement ? 'pl-10' : ''}
              ${hasRightElement ? 'pr-10' : ''}
              ${leftAddon ? 'rounded-l-none' : ''}
              ${rightAddon ? 'rounded-r-none' : ''}
            `}
            {...props}
          />

          {/* Right Icons/Buttons */}
          {hasRightElement && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              {/* Clear Button */}
              {clearable && value && !disabled && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Password Toggle */}
              {type === 'password' && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              )}

              {/* Right Icon */}
              {rightIcon && (
                <div className="text-text-secondary">
                  {rightIcon}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Addon */}
        {rightAddon && (
          <span className="inline-flex items-center px-3 bg-surface-variant border border-l-0 border-border-color rounded-r-default text-text-secondary text-sm">
            {rightAddon}
          </span>
        )}
      </div>

      {/* Description */}
      {description && !error && (
        <p id={descriptionId} className="mt-1 text-sm text-text-secondary">{description}</p>
      )}

      {/* Error */}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-danger">{error}</p>
      )}
    </div>
  );
});

/**
 * InputGroup Component
 * Group multiple inputs
 */
export const InputGroup = ({
  children,
  className = '',
}) => {
  return (
    <div className={`flex ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        const isFirst = index === 0;
        const isLast = index === React.Children.count(children) - 1;
        
        let groupClasses = '';
        if (!isFirst && !isLast) groupClasses = 'rounded-none border-l-0';
        if (isFirst) groupClasses = 'rounded-r-none';
        if (isLast) groupClasses = 'rounded-l-none border-l-0';
        
        return React.cloneElement(child, {
          className: `${child.props.className || ''} ${groupClasses}`,
        });
      })}
    </div>
  );
};

/**
 * NumberInput Component
 * Input with increment/decrement buttons
 */
export const NumberInput = React.forwardRef(({
  value,
  onChange,
  min,
  max,
  step = 1,
  ...props
}, ref) => {
  const handleIncrement = () => {
    const newValue = (parseFloat(value) || 0) + step;
    if (max === undefined || newValue <= max) {
      onChange?.({ target: { value: newValue.toString() } });
    }
  };

  const handleDecrement = () => {
    const newValue = (parseFloat(value) || 0) - step;
    if (min === undefined || newValue >= min) {
      onChange?.({ target: { value: newValue.toString() } });
    }
  };

  return (
    <div className="relative">
      <Input
        ref={ref}
        // type="number"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        {...props}
      />
      <div className="absolute right-1 top-2/3 transform -translate-y-1/2 flex flex-col">
        <button
          type="button"
          onClick={handleIncrement}
          aria-label="Increase value"
          className="px-2 py-0.5 text-xs text-text-secondary hover:text-text-primary hover:bg-surface-variant rounded-t"
        >
          ▲
        </button>
        <button
          type="button"
          onClick={handleDecrement}
          aria-label="Decrease value"
          className="px-2 py-0.5 text-xs text-text-secondary hover:text-text-primary hover:bg-surface-variant rounded-b"
        >
          ▼
        </button>
      </div>
    </div>
  );
});

/**
 * SearchInput Component
 * Input optimized for search
 */
export const SearchInput = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
  ...props
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
    }
  };

  return (
    <Input
      type="search"
      value={value}
      onChange={onChange}
      onKeyPress={handleKeyPress}
      placeholder={placeholder}
      leftIcon={<span className="w-4 h-4" aria-hidden="true">🔍</span>}
      clearable
      {...props}
    />
  );
};

export default Input;