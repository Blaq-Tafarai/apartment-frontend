import { AlertCircle } from 'lucide-react';
import React, { useState, useRef, useEffect, useId } from 'react';

const TextArea = React.forwardRef(({
  value,
  defaultValue,
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
  resize = 'vertical',
  ...props
}, ref) => {
  const innerRef = useRef(null);

  const descriptionId = useId();
  const errorId = useId();

  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [charCount, setCharCount] = useState(
    (value ?? defaultValue ?? '').length
  );

  const currentValue = isControlled ? value : internalValue;

  // ----------------------------------
  // Handle change (FIXED)
  // ----------------------------------
  const handleChange = (e) => {
    const newValue = e.target.value;

    setCharCount(newValue.length);

    if (!isControlled) {
      setInternalValue(newValue);
    }

    onChange?.(e);
  };

  // ----------------------------------
  // Auto resize
  // ----------------------------------
  useEffect(() => {
    if (autoResize && innerRef.current) {
      innerRef.current.style.height = 'auto';
      innerRef.current.style.height = `${innerRef.current.scrollHeight}px`;
    }
  }, [currentValue, autoResize]);

  // ----------------------------------
  // Resize styles
  // ----------------------------------
  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  };

  const ariaDescribedBy = [description && descriptionId, error && errorId]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div className={className}>
      {/* LABEL */}
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      {/* DESCRIPTION (only if no error) */}
      {description && !error && (
        <p id={descriptionId} className="text-sm text-text-secondary mb-2">
          {description}
        </p>
      )}

      {/* TEXTAREA WRAPPER */}
      <div className="relative">
        <textarea
          ref={(el) => {
            innerRef.current = el;
            if (typeof ref === 'function') ref(el);
            else if (ref) ref.current = el;
          }}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          rows={autoResize ? 1 : rows}
          maxLength={maxLength}
          name={name}
          required={required}
          aria-describedby={ariaDescribedBy}
          aria-invalid={!!error}
          className={`
            w-full px-4 py-2.5 bg-surface border rounded-default
            text-text-primary placeholder-text-tertiary
            focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            read-only:bg-surface-variant read-only:cursor-default
            transition-all duration-300
            ${resizeClasses[resize]}
            ${error ? 'border-danger focus:ring-danger' : 'border-border-color'}
          `}
          {...props}
        />

        {/* CHARACTER COUNT */}
        {showCount && (
          <div className="absolute bottom-2 right-2 text-xs text-text-tertiary bg-surface px-2 py-1 rounded">
            {charCount}
            {maxLength && ` / ${maxLength}`}
          </div>
        )}
      </div>

      {/* ERROR (same pattern as Input) */}
      {error && (
        <div className="mt-1 flex items-center">
          <span>
            <AlertCircle className="w-4 h-4 inline-block mr-1 text-danger" />
          </span>
          <p id={errorId} className="mt-1 text-sm text-danger">{error}</p>
        </div>
      )}
    </div>
  );
});

export default TextArea;