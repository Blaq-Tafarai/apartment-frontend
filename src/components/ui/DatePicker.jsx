import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/**
 * DatePicker Component
 * Modern date picker with calendar view
 */
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
  required = false,
  showCalendarIcon = true,
  clearable = true,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value) : new Date()
  );
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const containerRef = useRef(null);
  const errorId = `datepicker-error-${Math.random().toString(36).substr(2, 9)}`;
  const liveRegionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    
    return format
      .replace('MM', month)
      .replace('DD', day)
      .replace('YYYY', year);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Previous month days
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isDateDisabled = (date) => {
    if (!date) return true;
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isToday = (date) => {
    return isSameDay(date, new Date());
  };

  const handleDateSelect = (date) => {
    if (!isDateDisabled(date)) {
      setSelectedDate(date);
      onChange?.(date);
      setIsOpen(false);
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = `Selected date: ${formatDate(date)}`;
      }
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setSelectedDate(null);
    onChange?.(null);
  };

  const days = getDaysInMonth(currentMonth);

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
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-describedby={error ? errorId : undefined}
      >
        {showCalendarIcon && (
          <Calendar className="w-5 h-5 text-text-secondary mr-2" />
        )}
        <input
          type="text"
          value={formatDate(selectedDate)}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          className="flex-1 bg-transparent outline-none text-text-primary placeholder-text-tertiary cursor-pointer"
        />
        {clearable && selectedDate && !disabled && (
          <button
            onClick={handleClear}
            className="ml-2 text-text-secondary hover:text-text-primary"
          >
            ×
          </button>
        )}
      </div>

      {error && <p id={errorId} className="mt-1 text-sm text-danger">{error}</p>}

      {/* Calendar Dropdown */}
      {isOpen && (
        <div role="dialog" aria-label="Choose date" className="absolute z-50 mt-2 p-4 bg-surface border border-border-color rounded-default shadow-lg animate-fade-in">
          {/* Month/Year Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              aria-label="Previous month"
              className="p-1 hover:bg-surface-variant rounded transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-semibold text-text-primary">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button
              onClick={handleNextMonth}
              aria-label="Next month"
              className="p-1 hover:bg-surface-variant rounded transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-text-secondary p-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => day && handleDateSelect(day)}
                disabled={!day || isDateDisabled(day)}
                className={`
                  p-2 text-sm rounded transition-all
                  ${!day ? 'invisible' : ''}
                  ${isDateDisabled(day) ? 'text-text-tertiary cursor-not-allowed' : 'hover:bg-surface-variant'}
                  ${isSameDay(day, selectedDate) ? 'bg-primary text-white hover:bg-primary-dark' : ''}
                  ${isToday(day) && !isSameDay(day, selectedDate) ? 'border border-primary' : ''}
                `}
              >
                {day?.getDate()}
              </button>
            ))}
          </div>

          {/* Today Button */}
          <div className="mt-3 pt-3 border-t border-border-color">
            <button
              onClick={() => handleDateSelect(new Date())}
              aria-label="Select today's date"
              className="w-full px-3 py-2 text-sm text-primary hover:bg-primary hover:text-white rounded transition-all"
            >
              Today
            </button>
          </div>
        </div>
      )}

      {/* Live Region for announcements */}
      <div ref={liveRegionRef} aria-live="polite" aria-atomic="true" className="sr-only"></div>
    </div>
  );
};

export default DatePicker;
