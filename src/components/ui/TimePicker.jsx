import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Clock } from 'lucide-react';

/**
 * TimePicker Component
 * Advanced time picker with 12/24 hour format
 */
const TimePicker = React.forwardRef(({
  value,
  onChange,
  disabled = false,
  format = '12', // '12' or '24'
  placeholder = 'Select time',
  error,
  label,
  required = false,
  showIcon = true,
  minuteStep = 1,
  clearable = true,
  className = '',
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);
  const [period, setPeriod] = useState('AM');
  const containerRef = useRef(null);

  useEffect(() => {
    if (value) {
      const [time, periodValue] = value.split(' ');
      const [h, m] = time.split(':');
      setHours(parseInt(h));
      setMinutes(parseInt(m));
      if (periodValue) setPeriod(periodValue);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTime = () => {
    if (!hours && !minutes) return '';
    
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    
    if (format === '24') {
      return `${h}:${m}`;
    }
    return `${h}:${m} ${period}`;
  };

  const handleApply = () => {
    const timeString = formatTime();
    onChange?.(timeString);
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setHours(0);
    setMinutes(0);
    setPeriod('AM');
    onChange?.('');
  };

  const generateHours = useMemo(() => {
    const max = format === '24' ? 23 : 12;
    const start = format === '24' ? 0 : 1;
    return Array.from({ length: max - start + 1 }, (_, i) => start + i);
  }, [format]);

  const generateMinutes = useMemo(() => {
    return Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep);
  }, [minuteStep]);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      {/* Input */}
      <div
        className={`
          relative flex items-center px-4 py-2.5 bg-surface border rounded-default
          cursor-pointer transition-all
          ${error ? 'border-danger' : 'border-border-color hover:border-primary'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={label || 'Time picker'}
      >
        {showIcon && (
          <Clock className="w-5 h-5 text-text-secondary mr-2" />
        )}
        <input
          type="text"
          value={formatTime()}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          className="flex-1 bg-transparent outline-none text-text-primary placeholder-text-tertiary cursor-pointer"
        />
        {clearable && formatTime() && !disabled && (
          <button
            onClick={handleClear}
            className="ml-2 text-text-secondary hover:text-text-primary"
          >
            ×
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-danger">{error}</p>}

      {/* Time Picker Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 p-4 bg-surface border border-border-color rounded-default shadow-lg animate-fade-in w-64">
          <div className="flex gap-2 mb-4">
            {/* Hours */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-text-secondary mb-2">
                Hours
              </label>
              <div className="max-h-40 overflow-y-auto border border-border-color rounded">
                {generateHours.map((hour) => (
                  <button
                    key={hour}
                    type="button"
                    onClick={() => setHours(hour)}
                    className={`
                      w-full px-3 py-2 text-sm text-left transition-colors
                      ${hours === hour ? 'bg-primary text-white' : 'hover:bg-surface-variant'}
                    `}
                  >
                    {String(hour).padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>

            {/* Minutes */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-text-secondary mb-2">
                Minutes
              </label>
              <div className="max-h-40 overflow-y-auto border border-border-color rounded">
                {generateMinutes.map((minute) => (
                  <button
                    key={minute}
                    onClick={() => setMinutes(minute)}
                    className={`
                      w-full px-3 py-2 text-sm text-left transition-colors
                      ${minutes === minute ? 'bg-primary text-white' : 'hover:bg-surface-variant'}
                    `}
                  >
                    {String(minute).padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>

            {/* AM/PM */}
            {format === '12' && (
              <div className="w-16">
                <label className="block text-xs font-medium text-text-secondary mb-2">
                  Period
                </label>
                <div className="border border-border-color rounded">
                  <button
                    type="button"
                    onClick={() => setPeriod('AM')}
                    className={`
                      w-full px-2 py-2 text-sm transition-colors
                      ${period === 'AM' ? 'bg-primary text-white' : 'hover:bg-surface-variant'}
                    `}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => setPeriod('PM')}
                    className={`
                      w-full px-2 py-2 text-sm transition-colors border-t border-border-color
                      ${period === 'PM' ? 'bg-primary text-white' : 'hover:bg-surface-variant'}
                    `}
                  >
                    PM
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-3 border-t border-border-color">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 px-3 py-2 text-sm border border-border-color rounded hover:bg-surface-variant transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 px-3 py-2 text-sm bg-primary text-white rounded hover:bg-primary-dark transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default TimePicker;
