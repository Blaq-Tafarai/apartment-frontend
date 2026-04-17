import React from 'react';
import { X } from 'lucide-react';

/**
 * Badge Component
 * Versatile badge/label component with multiple styles
 * 
 * @param {string} children - Badge content
 * @param {string} variant - Style variant: 'default', 'solid', 'outline', 'soft'
 * @param {string} color - Color theme: 'primary', 'success', 'danger', 'warning', 'info', 'gray'
 * @param {string} size - Size: 'sm', 'md', 'lg'
 * @param {boolean} dot - Show dot indicator
 * @param {ReactNode} icon - Icon component
 * @param {function} onRemove - Remove handler (makes badge dismissible)
 * @param {boolean} pill - Rounded pill shape
 * @param {boolean} uppercase - Uppercase text
 * @param {string} className - Additional CSS classes
 */
const Badge = ({
  children,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  dot = false,
  icon,
  onRemove,
  pill = false,
  uppercase = false,
  className = '',
  ...props
}) => {
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const colors = {
    primary: {
      solid: 'bg-primary text-white',
      outline: 'border-2 border-primary text-primary bg-transparent',
      soft: 'bg-primary bg-opacity-10 text-primary',
      default: 'bg-blue-100 text-blue-800',
    },
    success: {
      solid: 'bg-success text-white',
      outline: 'border-2 border-success text-success bg-transparent',
      soft: 'bg-success bg-opacity-10 text-success',
      default: 'bg-green-100 text-green-800',
    },
    danger: {
      solid: 'bg-danger text-white',
      outline: 'border-2 border-danger text-danger bg-transparent',
      soft: 'bg-danger bg-opacity-10 text-danger',
      default: 'bg-red-100 text-red-800',
    },
    warning: {
      solid: 'bg-warning text-white',
      outline: 'border-2 border-warning text-warning bg-transparent',
      soft: 'bg-warning bg-opacity-10 text-warning',
      default: 'bg-yellow-100 text-yellow-800',
    },
    info: {
      solid: 'bg-info text-white',
      outline: 'border-2 border-info text-info bg-transparent',
      soft: 'bg-info bg-opacity-10 text-info',
      default: 'bg-blue-100 text-blue-800',
    },
    gray: {
      solid: 'bg-gray-500 text-white',
      outline: 'border-2 border-gray-500 text-gray-700 bg-transparent',
      soft: 'bg-gray-100 text-gray-700',
      default: 'bg-gray-100 text-gray-700',
    },
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 font-medium
        ${sizes[size]}
        ${colors[color]?.[variant] || 'bg-primary text-white'}
        ${pill ? 'rounded-full' : 'rounded'}
        ${uppercase ? 'uppercase' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Dot Indicator */}
      {dot && (
        <span
          className={`${dotSizes[size]} rounded-full ${
            variant === 'solid' ? 'bg-white' : `bg-${color}`
          }`}
        />
      )}

      {/* Icon */}
      {icon && <span className="flex-shrink-0">{icon}</span>}

      {/* Content */}
      {children}

      {/* Remove Button */}
      {onRemove && (
        <button
          onClick={onRemove}
          className="flex-shrink-0 hover:opacity-70 transition-opacity ml-1"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};

/**
 * NotificationBadge Component
 * Badge positioned relative to parent (for notification counts)
 */
export const NotificationBadge = ({
  count,
  max = 99,
  position = 'top-right',
  dot = false,
  color = 'danger',
  children,
  className = '',
}) => {
  const positions = {
    'top-right': '-top-1 -right-1',
    'top-left': '-top-1 -left-1',
    'bottom-right': '-bottom-1 -right-1',
    'bottom-left': '-bottom-1 -left-1',
  };

  const displayCount = count > max ? `${max}+` : count;

  return (
    <div className={`relative inline-block ${className}`}>
      {children}
      {(count > 0 || dot) && (
        <span
          className={`
            absolute ${positions[position]} z-10
            flex items-center justify-center
            ${dot ? 'w-2 h-2' : 'min-w-[1.25rem] h-5 px-1'}
            text-xs font-bold text-white rounded-full
            ${color === 'primary' ? 'bg-primary' : ''}
            ${color === 'success' ? 'bg-success' : ''}
            ${color === 'danger' ? 'bg-danger' : ''}
            ${color === 'warning' ? 'bg-warning' : ''}
            ${color === 'info' ? 'bg-info' : ''}
          `}
        >
          {!dot && displayCount}
        </span>
      )}
    </div>
  );
};

/**
 * StatusBadge Component
 * Badge for status indicators
 */
export const StatusBadge = ({
  status,
  label,
  size = 'md',
  ...props
}) => {
  const statusConfig = {
    online: { color: 'success', label: label || 'Online', dot: true },
    offline: { color: 'gray', label: label || 'Offline', dot: true },
    away: { color: 'warning', label: label || 'Away', dot: true },
    busy: { color: 'danger', label: label || 'Busy', dot: true },
    active: { color: 'success', label: label || 'Active' },
    inactive: { color: 'gray', label: label || 'Inactive' },
    pending: { color: 'warning', label: label || 'Pending' },
    approved: { color: 'success', label: label || 'Approved' },
    rejected: { color: 'danger', label: label || 'Rejected' },
  };

  const config = statusConfig[status] || statusConfig.offline;

  return (
    <Badge
      color={config.color}
      size={size}
      dot={config.dot}
      variant="soft"
      {...props}
    >
      {config.label}
    </Badge>
  );
};

export default Badge;