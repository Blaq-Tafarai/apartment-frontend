import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, X, Check, Search, AlertCircle } from 'lucide-react';

/**
 * Select Component
 * Advanced select with search, multi-select, and custom rendering
 */
const Select = React.forwardRef(({
  options = [],
  value,
  onChange,
  placeholder = 'Select option',
  disabled = false,
  multiple = false,
  searchable = false,
  clearable = true,
  error,
  label,
  required = false,
  loading = false,
  maxHeight = '300px',
  renderOption,
  renderValue,
  className = '',
  name,
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  const labelId = label ? `select-label-${Math.random().toString(36).substr(2, 9)}` : null;
  const errorId = error ? `select-error-${Math.random().toString(36).substr(2, 9)}` : null;

  const handleKeyDown = (e) => {
    if (disabled) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          handleSelect(filteredOptions[focusedIndex].value);
        } else {
          setIsOpen(!isOpen);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const filteredOptions = useMemo(() => {
    if (!searchable) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, searchable]);

  const isSelected = (optionValue) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  const handleSelect = (optionValue) => {
    if (multiple) {
      const newValue = Array.isArray(value) ? [...value] : [];
      const index = newValue.indexOf(optionValue);
      
      if (index > -1) {
        newValue.splice(index, 1);
      } else {
        newValue.push(optionValue);
      }
      
      onChange?.(newValue);
    } else {
      onChange?.(optionValue);
      setIsOpen(false);
    }
    setSearchTerm('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange?.(multiple ? [] : null);
  };

  const handleRemoveTag = (e, optionValue) => {
    e.stopPropagation();
    if (multiple && Array.isArray(value)) {
      const newValue = value.filter((v) => v !== optionValue);
      onChange?.(newValue);
    }
  };

  const getDisplayValue = () => {
    if (multiple && Array.isArray(value) && value.length > 0) {
      return value
        .map((v) => options.find((opt) => opt.value === v)?.label)
        .filter(Boolean);
    }
    
    if (!multiple && value) {
      const selected = options.find((opt) => opt.value === value);
      return selected ? (renderValue ? renderValue(selected) : selected.label) : '';
    }
    
    return '';
  };

  const displayValue = getDisplayValue();

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label id={labelId} className="block text-sm font-medium text-text-primary mb-2">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      {/* Select Input */}
      <div
        className={`
          relative min-h-[42px] px-4 py-2 bg-surface border rounded-default
          cursor-pointer transition-all flex items-center gap-2
          ${error ? 'border-danger' : 'border-border-color hover:border-primary'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${isOpen ? 'ring-2 ring-primary border-transparent' : ''}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={labelId}
        aria-describedby={errorId}
      >
        {/* Selected Values */}
        <div className="flex-1 flex flex-wrap gap-1">
          {multiple && Array.isArray(displayValue) && displayValue.length > 0 ? (
            displayValue.map((label, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary bg-opacity-10 text-primary text-sm rounded"
              >
                {label}
                <button
                  onClick={(e) => {
                    const optionValue = value[index];
                    handleRemoveTag(e, optionValue);
                  }}
                  className="hover:text-primary-dark"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          ) : (
            <span className={displayValue ? 'text-text-primary' : 'text-text-tertiary'}>
              {displayValue || placeholder}
            </span>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-1">
          {clearable && displayValue && !disabled && (
            <button
              onClick={handleClear}
              className="text-text-secondary hover:text-text-primary p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <ChevronDown
            className={`w-4 h-4 text-text-secondary transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </div>

        {/* Hidden input for form compatibility */}
        <input type="hidden" name={name} value={value || ''} />
      </div>

      {error && 
      <div className="mt-1 flex items-center">
          <span>
            <AlertCircle className="w-4 h-4 inline-block mr-1 text-danger" />
          </span>
          <p id={errorId} className="mt-1 text-sm text-danger">{error}</p>
        </div>
      }

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute z-50 w-full mt-2 bg-surface border border-border-color rounded-default shadow-lg animate-fade-in"
          style={{ maxHeight }}
        >
          {/* Search */}
          {searchable && (
            <div className="p-2 border-b border-border-color">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 py-2 bg-background border border-border-color rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}

          {/* Options */}
          <div className="overflow-y-auto" style={{ maxHeight: '250px' }} role="listbox">
            {loading ? (
              <div className="p-4 text-center text-text-secondary">Loading...</div>
            ) : filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-text-secondary">No options found</div>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                  className={`
                    px-4 py-2.5 cursor-pointer transition-colors flex items-center justify-between
                    ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface-variant'}
                    ${isSelected(option.value) ? 'bg-primary bg-opacity-10' : ''}
                    ${focusedIndex === index ? 'bg-surface-variant' : ''}
                  `}
                  role="option"
                  aria-selected={isSelected(option.value)}
                >
                  {renderOption ? (
                    renderOption(option)
                  ) : (
                    <span className="text-text-primary">{option.label}</span>
                  )}
                  {isSelected(option.value) && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default Select;
