import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  X 
} from 'lucide-react';

/**
 * Alert Component
 * Alert/notification banner with multiple variants
 * 
 * @param {string} type - Alert type: 'success', 'error', 'warning', 'info'
 * @param {string} title - Alert title
 * @param {string} message - Alert message
 * @param {string} variant - Style variant: 'solid', 'soft', 'outlined', 'left-accent'
 * @param {boolean} dismissible - Show close button
 * @param {function} onClose - Close handler
 * @param {ReactNode} icon - Custom icon
 * @param {ReactNode} action - Action button/link
 * @param {string} className - Additional CSS classes
 */
const Alert = ({
  type = 'info',
  title,
  message,
  variant = 'soft',
  dismissible = false,
  onClose,
  icon: customIcon,
  action,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  const colors = {
    success: {
      solid: 'bg-success text-white',
      soft: 'bg-green-50 text-green-800 border-green-200',
      outlined: 'bg-transparent text-green-800 border-2 border-green-500',
      'left-accent': 'bg-green-50 text-green-800 border-l-4 border-green-500',
    },
    error: {
      solid: 'bg-danger text-white',
      soft: 'bg-red-50 text-red-800 border-red-200',
      outlined: 'bg-transparent text-red-800 border-2 border-red-500',
      'left-accent': 'bg-red-50 text-red-800 border-l-4 border-red-500',
    },
    warning: {
      solid: 'bg-warning text-white',
      soft: 'bg-yellow-50 text-yellow-800 border-yellow-200',
      outlined: 'bg-transparent text-yellow-800 border-2 border-yellow-500',
      'left-accent': 'bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500',
    },
    info: {
      solid: 'bg-info text-white',
      soft: 'bg-blue-50 text-blue-800 border-blue-200',
      outlined: 'bg-transparent text-blue-800 border-2 border-blue-500',
      'left-accent': 'bg-blue-50 text-blue-800 border-l-4 border-blue-500',
    },
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  const icon = customIcon || icons[type];

  return (
    <div
      className={`
        flex gap-3 p-4 rounded-default border
        ${colors[type]?.[variant] || colors.info.soft}
        ${className}
      `}
      role="alert"
      {...props}
    >
      {/* Icon */}
      {icon && (
        <div className="flex-shrink-0 mt-0.5">
          {icon}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="font-semibold text-sm mb-1">
            {title}
          </h4>
        )}
        {message && (
          <p className={`text-sm ${variant === 'solid' ? 'opacity-90' : ''}`}>
            {message}
          </p>
        )}
        {action && (
          <div className="mt-3">
            {action}
          </div>
        )}
      </div>

      {/* Close Button */}
      {dismissible && (
        <button
          onClick={handleClose}
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Close alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

/**
 * AlertList Component
 * Stack of alerts
 */
export const AlertList = ({
  alerts = [],
  onRemove,
  className = '',
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {alerts.map((alert, index) => (
        <Alert
          key={alert.id || index}
          {...alert}
          dismissible={true}
          onClose={() => onRemove?.(alert.id || index)}
        />
      ))}
    </div>
  );
};

/**
 * InlineAlert Component
 * Compact inline alert for forms
 */
export const InlineAlert = ({
  type = 'info',
  message,
  className = '',
}) => {
  const colors = {
    success: 'text-success',
    error: 'text-danger',
    warning: 'text-warning',
    info: 'text-info',
  };

  const icons = {
    success: <CheckCircle className="w-4 h-4" />,
    error: <AlertCircle className="w-4 h-4" />,
    warning: <AlertTriangle className="w-4 h-4" />,
    info: <Info className="w-4 h-4" />,
  };

  return (
    <div className={`flex items-center gap-2 text-sm ${colors[type]} ${className}`}>
      {icons[type]}
      <span>{message}</span>
    </div>
  );
};

/**
 * Banner Component
 * Full-width banner alert
 */
export const Banner = ({
  type = 'info',
  message,
  action,
  dismissible = true,
  onClose,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const colors = {
    success: 'bg-success text-white',
    error: 'bg-danger text-white',
    warning: 'bg-warning text-white',
    info: 'bg-info text-white',
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div className={`${colors[type]} ${className}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium flex-1">{message}</p>
          
          <div className="flex items-center gap-3">
            {action && (
              <div className="text-sm font-medium underline hover:no-underline cursor-pointer">
                {action}
              </div>
            )}
            
            {dismissible && (
              <button
                onClick={handleClose}
                className="hover:opacity-80 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;