import React, { useState, useRef, useEffect, useId } from 'react';
import { AlertCircle, Calendar, ChevronLeft, ChevronRight, CrossIcon, X } from 'lucide-react';

const months = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

const weekDays = ['Su','Mo','Tu','We','Th','Fr','Sa'];

const DatePicker = ({
  value,
  onChange,
  disabled = false,
  minDate,
  maxDate,
  placeholder = 'Select date',
  format = 'MM/DD/YYYY',
  error,
  label,
  description,
  required = false,
  showCalendarIcon = true,
  clearable = true,
  className = '',
}) => {
  const containerRef = useRef(null);
  const liveRegionRef = useRef(null);

  const errorId = useId();
  const descriptionId = useId();

  // -----------------------------
  // STATE (controlled + sync fix)
  // -----------------------------
  const parsedValue = value ? new Date(value) : null;

  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    parsedValue || new Date()
  );
  const [selectedDate, setSelectedDate] = useState(parsedValue);

  // sync external value changes
  useEffect(() => {
    if (value) {
      const d = new Date(value);
      setSelectedDate(d);
      setCurrentMonth(d);
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  // -----------------------------
  // outside click / escape
  // -----------------------------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // -----------------------------
  // utils
  // -----------------------------
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);

    return format
      .replace('MM', String(d.getMonth() + 1).padStart(2, '0'))
      .replace('DD', String(d.getDate()).padStart(2, '0'))
      .replace('YYYY', d.getFullYear());
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);

    const days = [];

    for (let i = 0; i < first.getDay(); i++) days.push(null);
    for (let i = 1; i <= last.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isDisabled = (date) => {
    if (!date) return true;
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  const isSameDay = (a, b) =>
    a && b &&
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const isToday = (d) => isSameDay(d, new Date());

  // -----------------------------
  // actions
  // -----------------------------
  const handleSelect = (date) => {
    if (!date || isDisabled(date)) return;

    setSelectedDate(date);
    onChange?.(date);
    setIsOpen(false);

    liveRegionRef.current.textContent =
      `Selected date ${formatDate(date)}`;
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setSelectedDate(null);
    onChange?.(null);
  };

  const days = getDaysInMonth(currentMonth);

  const ariaDescribedBy =
    [description ? descriptionId : null, error ? errorId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className={`relative ${className}`} ref={containerRef}>

      {/* LABEL */}
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      {/* DESCRIPTION */}
      {description && !error && (
        <p id={descriptionId} className="text-sm text-text-secondary mb-2">
          {description}
        </p>
      )}

      {/* INPUT */}
      <div
        className={`
          flex items-center px-4 py-2.5 bg-surface border rounded-default
          cursor-pointer transition-all
          ${error ? 'border-danger' : 'border-border-color hover:border-primary'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-describedby={ariaDescribedBy}
        aria-invalid={!!error}
      >
        {showCalendarIcon && (
          <Calendar className="w-5 h-5 text-text-secondary mr-2" />
        )}

        <input
          value={formatDate(selectedDate)}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          className="flex-1 bg-transparent outline-none"
        />

        {clearable && selectedDate && (
          <button onClick={handleClear} className="ml-2">
            <X className="w-4 h-4 text-text-secondary" />
          </button>
        )}
      </div>

      {/* ERROR */}
      {error && (
        <div className="mt-1 flex items-center">
          <span>
            <AlertCircle className="w-4 h-4 inline-block mr-1 text-danger" />
          </span>
          <p id={errorId} className="mt-1 text-sm text-danger">{error}</p>
        </div>
      )}

      {/* CALENDAR */}
      {isOpen && (
        <div className="absolute z-50 mt-2 p-4 bg-surface border rounded-default shadow-lg">
          
          {/* header */}
          <div className="flex justify-between mb-4">
            <button onClick={() =>
              setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
            }>
              <ChevronLeft />
            </button>

            <span>
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>

            <button onClick={() =>
              setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
            }>
              <ChevronRight />
            </button>
          </div>

          {/* days */}
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map(d => (
              <div key={d} className="text-xs text-center">{d}</div>
            ))}

            {days.map((day, i) => (
              <button
                key={i}
                disabled={!day || isDisabled(day)}
                onClick={() => handleSelect(day)}
                className={`
                  p-2 text-sm rounded
                  ${!day ? 'invisible' : ''}
                  ${isDisabled(day) ? 'opacity-40' : 'hover:bg-surface-variant'}
                  ${isSameDay(day, selectedDate) ? 'bg-primary text-white' : ''}
                  ${isToday(day) ? 'border border-primary' : ''}
                `}
              >
                {day?.getDate()}
              </button>
            ))}
          </div>

          {/* today */}
          <button
            className="w-full mt-3 text-sm text-primary"
            onClick={() => handleSelect(new Date())}
          >
            Today
          </button>
        </div>
      )}

      {/* LIVE REGION */}
      <div ref={liveRegionRef} className="sr-only" aria-live="polite" />
    </div>
  );
};

export default DatePicker;