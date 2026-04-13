import React, { useState, useRef, useEffect, useId } from 'react';

/**
 * TextArea Component
 * Advanced textarea with character count, auto-resize, and more
 */
const TextArea = React.forwardRef(({
  value,
  onChange,
  placeholder,
  disabled = false,
  readOnly = false,
  rows = 3,
  maxLength,
  showCount = false,
  autoResize = false,
  error,
  label,
  description,
  required = false,
  name,
  className = '',
  resize = 'vertical', // 'none', 'vertical', 'horizontal', 'both'
  ...props
}, ref) => {
  const [charCount, setCharCount] = useState(value?.length || 0);
  const textareaRef = useRef(null);
  const descriptionId = useId();

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, autoResize]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setCharCount(newValue.length);
    onChange?.(e);
  };

  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      {description && (
        <p id={descriptionId} className="text-sm text-text-secondary mb-2">{description}</p>
      )}

      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          rows={autoResize ? 1 : rows}
          maxLength={maxLength}
          name={name}
          required={required}
          aria-describedby={description ? descriptionId : undefined}
          aria-invalid={error ? 'true' : undefined}
          className={`
            w-full px-4 py-2.5 bg-surface border rounded-default
            text-text-primary placeholder-text-tertiary
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300
            ${error ? 'border-danger focus:ring-danger' : 'border-border-color'}
            ${resizeClasses[resize]}
          `}
          {...props}
        />

        {showCount && (
          <div className="absolute bottom-2 right-2 text-xs text-text-tertiary bg-surface px-2 py-1 rounded" aria-live="polite">
            {charCount}
            {maxLength && ` / ${maxLength}`}
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-danger">{error}</p>}

      {!error && maxLength && showCount && (
        <p className="mt-1 text-xs text-text-secondary">
          {charCount} / {maxLength} characters
        </p>
      )}
    </div>
  );
});

export default TextArea;
