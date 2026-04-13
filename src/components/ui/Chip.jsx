import React from 'react';
import { X } from 'lucide-react';

/**
 * Chip Component
 * Versatile chip/tag component with multiple variants
 */
const Chip = ({
  label,
  onDelete,
  onClick,
  disabled = false,
  variant = 'default',
  size = 'md',
  color = 'primary',
  avatar,
  icon,
  className = '',
  ...props
}) => {
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const variants = {
    default: 'bg-surface border border-border-color text-text-primary',
    filled: `bg-${color} text-white`,
    outlined: `border-2 border-${color} text-${color} bg-transparent`,
    light: `bg-${color} bg-opacity-10 text-${color}`,
  };

  const isClickable = onClick && !disabled;
  const isDeletable = onDelete && !disabled;

  return (
    <div
      onClick={isClickable ? onClick : undefined}
      className={`
        inline-flex items-center gap-1.5 rounded-full transition-all
        ${sizes[size]}
        ${variants[variant]}
        ${isClickable ? 'cursor-pointer hover:opacity-80' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Avatar */}
      {avatar && (
        <img
          src={avatar}
          alt=""
          className="w-5 h-5 rounded-full object-cover"
        />
      )}

      {/* Icon */}
      {icon && <span className="flex-shrink-0">{icon}</span>}

      {/* Label */}
      <span className="font-medium">{label}</span>

      {/* Delete Button */}
      {isDeletable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="flex-shrink-0 hover:opacity-70 transition-opacity ml-1"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

/**
 * ChipGroup Component
 * Manages a group of chips
 */
export const ChipGroup = ({
  chips = [],
  onChipClick,
  onChipDelete,
  variant = 'default',
  size = 'md',
  color = 'primary',
  multiSelect = false,
  selectedChips = [],
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {chips.map((chip, index) => {
        const isSelected = selectedChips.includes(chip.value || chip.label);
        
        return (
          <Chip
            key={index}
            label={chip.label}
            icon={chip.icon}
            avatar={chip.avatar}
            onClick={onChipClick ? () => onChipClick(chip) : undefined}
            onDelete={onChipDelete ? () => onChipDelete(chip) : undefined}
            disabled={chip.disabled}
            variant={isSelected ? 'filled' : variant}
            size={size}
            color={color}
          />
        );
      })}
    </div>
  );
};

/**
 * ChipInput Component
 * Input field that creates chips from user input
 */
export const ChipInput = ({
  chips = [],
  onChipsChange,
  placeholder = 'Type and press Enter',
  disabled = false,
  maxChips,
  variant = 'light',
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      
      if (maxChips && chips.length >= maxChips) {
        return;
      }

      const newChips = [...chips, inputValue.trim()];
      onChipsChange(newChips);
      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && chips.length > 0) {
      const newChips = chips.slice(0, -1);
      onChipsChange(newChips);
    }
  };

  const handleDelete = (indexToRemove) => {
    const newChips = chips.filter((_, index) => index !== indexToRemove);
    onChipsChange(newChips);
  };

  return (
    <div
      className={`
        flex flex-wrap gap-2 p-2 bg-surface border border-border-color rounded-default
        focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {chips.map((chip, index) => (
        <Chip
          key={index}
          label={chip}
          onDelete={() => handleDelete(index)}
          variant={variant}
          size={size}
          color={color}
        />
      ))}
      
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={chips.length === 0 ? placeholder : ''}
        disabled={disabled || (maxChips && chips.length >= maxChips)}
        className="flex-1 min-w-[120px] bg-transparent outline-none text-text-primary placeholder-text-tertiary"
      />
    </div>
  );
};

export default Chip;