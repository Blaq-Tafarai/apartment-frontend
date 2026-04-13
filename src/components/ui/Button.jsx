import React from 'react';
import { Loader2 } from 'lucide-react';

const sizes = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

const variants = {
  primary: 'bg-primary hover:bg-primary-dark text-white shadow-sm hover:shadow-md',
  secondary: 'bg-surface-variant hover:bg-gray-300 text-text-primary border border-border-color',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost: 'text-primary hover:bg-primary hover:bg-opacity-10',
  danger: 'bg-danger hover:bg-red-600 text-white shadow-sm hover:shadow-md',
  success: 'bg-success hover:bg-green-600 text-white shadow-sm hover:shadow-md',
  warning: 'bg-warning hover:bg-orange-600 text-white shadow-sm hover:shadow-md',
  info: 'bg-info hover:bg-sky-600 text-white shadow-sm hover:shadow-md',
  link: 'text-primary hover:underline bg-transparent',
};

const iconSizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-7 h-7',
};

/**
 * Button Component
 * Versatile button with multiple variants and states
 *
 * @param {ReactNode} children - Button content
 * @param {string} variant - Style variant: 'primary', 'secondary', 'outline', 'ghost', 'danger', 'success'
 * @param {string} size - Size: 'xs', 'sm', 'md', 'lg', 'xl'
 * @param {boolean} disabled - Disabled state
 * @param {boolean} loading - Loading state
 * @param {ReactNode} leftIcon - Icon on the left
 * @param {ReactNode} rightIcon - Icon on the right
 * @param {boolean} fullWidth - Full width button
 * @param {string} type - Button type: 'button', 'submit', 'reset'
 * @param {function} onClick - Click handler
 * @param {string} className - Additional CSS classes
 */
const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}, ref) => {

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-default
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizes[size]}
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${loading ? 'relative' : ''}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <Loader2 className={`${iconSizes[size]} animate-spin`} aria-hidden="true" />
      )}
      
      {!loading && leftIcon && (
        <span className={iconSizes[size]}>{leftIcon}</span>
      )}
      
      {children}
      
      {!loading && rightIcon && (
        <span className={iconSizes[size]}>{rightIcon}</span>
      )}
    </button>
  );
});

/**
 * ButtonGroup Component
 * Group of buttons
 */
export const ButtonGroup = ({
  children,
  orientation = 'horizontal',
  className = '',
}) => {
  return (
    <div
      className={`
        inline-flex
        ${orientation === 'vertical' ? 'flex-col' : 'flex-row'}
        ${className}
      `}
      role="group"
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        const isFirst = index === 0;
        const isLast = index === React.Children.count(children) - 1;
        
        let groupClasses = '';
        
        if (orientation === 'horizontal') {
          if (!isFirst && !isLast) groupClasses = 'rounded-none border-l-0';
          if (isFirst) groupClasses = 'rounded-r-none';
          if (isLast) groupClasses = 'rounded-l-none border-l-0';
        } else {
          if (!isFirst && !isLast) groupClasses = 'rounded-none border-t-0';
          if (isFirst) groupClasses = 'rounded-b-none';
          if (isLast) groupClasses = 'rounded-t-none border-t-0';
        }
        
        return React.cloneElement(child, {
          className: `${child.props.className || ''} ${groupClasses}`,
        });
      })}
    </div>
  );
};

/**
 * IconButton Component
 * Button with only an icon
 */
export const IconButton = ({
  icon,
  variant = 'ghost',
  size = 'md',
  rounded = true,
  'aria-label': ariaLabel,
  ...props
}) => {
  const sizes = {
    xs: 'p-1',
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
    xl: 'p-4',
  };

  return (
    <Button
      variant={variant}
      size={size}
      aria-label={ariaLabel}
      className={`${sizes[size]} ${rounded ? 'rounded-full' : ''}`}
      {...props}
    >
      {icon}
    </Button>
  );
};

export default Button;