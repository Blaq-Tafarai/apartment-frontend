import React, { createContext, useContext, useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

const icons = {
  success: <CheckCircle className="w-5 h-5" aria-hidden="true" />,
  error: <AlertCircle className="w-5 h-5" aria-hidden="true" />,
  warning: <AlertTriangle className="w-5 h-5" aria-hidden="true" />,
  info: <Info className="w-5 h-5" aria-hidden="true" />,
};

const colors = {
  success: 'bg-success text-white',
  error: 'bg-danger text-white',
  warning: 'bg-warning text-white',
  info: 'bg-info text-white',
};

const positions = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
};

/**
 * Toast Component
 */
const Toast = ({ id, title, message, type, duration, onClose, action }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-default shadow-lg min-w-[300px] max-w-md
        ${colors[type]}
        ${isExiting ? 'animate-slide-out' : 'animate-slide-in'}
      `}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold text-sm mb-1">{title}</p>}
        {message && <p className="text-sm opacity-90">{message}</p>}
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 text-sm font-medium underline hover:no-underline"
            aria-label={action.label}
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 hover:opacity-80 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

/**
 * ToastProvider Component
 */
export const ToastProvider = ({ children, position = 'top-right', maxToasts = 3 }) => {
  const [toasts, setToasts] = useState([]);

  const positions = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  };

  const addToast = ({
    title,
    message,
    type = 'info',
    duration = 3000,
    action,
  }) => {
    const id = Date.now() + Math.random();
    const newToast = { id, title, message, type, duration, action };

    setToasts((prev) => {
      const updated = [newToast, ...prev];
      return updated.slice(0, maxToasts);
    });

    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const removeAllToasts = () => {
    setToasts([]);
  };

  const toast = {
    success: (title, message, options = {}) =>
      addToast({ title, message, type: 'success', ...options }),
    error: (title, message, options = {}) =>
      addToast({ title, message, type: 'error', ...options }),
    warning: (title, message, options = {}) =>
      addToast({ title, message, type: 'warning', ...options }),
    info: (title, message, options = {}) =>
      addToast({ title, message, type: 'info', ...options }),
    custom: (options) => addToast(options),
    remove: removeToast,
    removeAll: removeAllToasts,
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      
      {/* Toast Container */}
      <div className={`fixed ${positions[position]} z-[9999] flex flex-col gap-2`} aria-live="polite">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// CSS animations (add to your global CSS)
const toastStyles = `
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}

.animate-slide-out {
  animation: slide-out 0.3s ease-out;
}
`;

export default Toast;