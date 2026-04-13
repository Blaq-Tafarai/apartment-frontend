import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const sizes = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  full: 'max-w-full mx-4',
};

const animations = {
  fade: 'animate-fade-in',
  'slide-up': 'animate-slide-up',
  'slide-down': 'animate-slide-down',
  zoom: 'animate-zoom',
};

const positions = {
  left: 'left-0 top-0 h-full animate-slide-in-left',
  right: 'right-0 top-0 h-full animate-slide-in-right',
  top: 'top-0 left-0 w-full animate-slide-in-top',
  bottom: 'bottom-0 left-0 w-full animate-slide-in-bottom',
};

const getDrawerSize = (size, position) => {
  const sizes = {
    sm: position === 'left' || position === 'right' ? 'w-80' : 'h-80',
    md: position === 'left' || position === 'right' ? 'w-96' : 'h-96',
    lg: position === 'left' || position === 'right' ? 'w-[32rem]' : 'h-[32rem]',
    xl: position === 'left' || position === 'right' ? 'w-[40rem]' : 'h-[40rem]',
    full: position === 'left' || position === 'right' ? 'w-full' : 'h-full',
  };
  return sizes[size];
};

/**
 * Modal/Dialog Component
 * Advanced modal with animations, sizes, and customization
 */
const Modal = React.forwardRef(({
  isOpen = false,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showOverlay = true,
  centered = true,
  animation = 'fade',
  className = '',
  overlayClassName = '',
  ...props
}, ref) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!closeOnEsc) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  // Generate ID for title
  const titleId = title ? `modal-title-${Math.random().toString(36).substr(2, 9)}` : null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className={`
        fixed inset-[-2rem] z-50 flex ${centered ? 'items-center justify-center' : 'items-start justify-center pt-20'} ${showOverlay ? 'bg-black bg-opacity-50 backdrop-blur-sm' : ''}
        ${animations[animation]}
        ${overlayClassName}
      `}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      {...props}
    >
      <div
        className={`
          bg-surface rounded-default w-full ${sizes[size]} 
          max-h-[90vh] flex flex-col shadow-2xl mx-4
          ${className}
        `}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-color flex-shrink-0">
            {title && (
              <h2 id={titleId} className="text-xl font-semibold text-text-primary">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-surface-variant transition-colors text-text-secondary hover:text-text-primary ml-auto"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border-color flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
});

/**
 * ConfirmDialog Component
 * Specialized modal for confirmations
 */
const variants = {
  danger: 'bg-danger hover:bg-red-600',
  warning: 'bg-warning hover:bg-orange-600',
  primary: 'bg-primary hover:bg-primary-dark',
  success: 'bg-success hover:bg-green-600',
};

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
}) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-text-secondary">{message}</p>
      
      <div className="flex gap-3 mt-6">
        <button
          onClick={onClose}
          disabled={loading}
          className="flex-1 px-4 py-2 border border-border-color rounded-default hover:bg-surface-variant transition-colors"
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className={`flex-1 px-4 py-2 text-white rounded-default transition-colors ${variants[variant]}`}
        >
          {loading ? 'Processing...' : confirmText}
        </button>
      </div>
    </Modal>
  );
};

/**
 * Drawer Component
 * Side drawer modal
 */
export const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  position = 'right',
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = '',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Generate ID for title
  const drawerTitleId = title ? `drawer-title-${Math.random().toString(36).substr(2, 9)}` : null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={closeOnOverlayClick ? onClose : undefined}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`
          fixed bg-surface shadow-2xl flex flex-col
          ${positions[position]}
          ${getDrawerSize(size, position)}
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
        aria-labelledby={title ? `drawer-title-${Math.random().toString(36).substr(2, 9)}` : undefined}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-color">
            {title && <h2 id={drawerTitleId} className="text-xl font-semibold text-text-primary">{title}</h2>}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-surface-variant transition-colors ml-auto"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-border-color">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;