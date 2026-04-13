import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const variants = {
  default: 'border-b border-border-color',
  bordered: 'border border-border-color rounded-default mb-2',
  filled: 'bg-surface-variant rounded-default mb-2',
};

/**
 * AccordionItem Component
 */
const AccordionItem = ({
  title,
  children,
  isOpen,
  onToggle,
  disabled = false,
  icon,
  variant = 'default',
  index,
}) => {

  const panelId = `accordion-panel-${index}`;
  const headerId = `accordion-header-${index}`;

  return (
    <div className={variants[variant]}>
      {/* Header */}
      <button
        id={headerId}
        onClick={onToggle}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={`
          w-full px-4 py-3 flex items-center justify-between gap-3
          text-left transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface-variant cursor-pointer'}
          ${variant === 'bordered' || variant === 'filled' ? 'rounded-t-default' : ''}
        `}
      >
        <div className="flex items-center gap-3 flex-1">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span className="font-medium text-text-primary">{title}</span>
        </div>
        <ChevronDown
          aria-hidden="true"
          className={`w-5 h-5 text-text-secondary transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {/* Content */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        aria-hidden={!isOpen}
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-4 py-3 text-text-secondary">{children}</div>
      </div>
    </div>
  );
};

/**
 * Accordion Component
 * 
 * @param {array} items - Array of accordion items
 * @param {boolean} allowMultiple - Allow multiple items to be open
 * @param {number|array} defaultOpen - Default open item index(es)
 * @param {string} variant - Style variant: 'default', 'bordered', 'filled'
 */
const Accordion = ({
  items = [],
  allowMultiple = false,
  defaultOpen = null,
  variant = 'default',
  className = '',
}) => {
  const [openItems, setOpenItems] = useState(() => {
    if (defaultOpen === null) return [];
    if (Array.isArray(defaultOpen)) return defaultOpen;
    return [defaultOpen];
  });

  const handleToggle = (index) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={className}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          icon={item.icon}
          isOpen={openItems.includes(index)}
          onToggle={() => handleToggle(index)}
          disabled={item.disabled}
          variant={variant}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

/**
 * Controlled Accordion - for more control
 */
export const ControlledAccordion = ({
  items = [],
  openItems = [],
  onToggle,
  variant = 'default',
  className = '',
}) => {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          icon={item.icon}
          isOpen={openItems.includes(index)}
          onToggle={() => onToggle(index)}
          disabled={item.disabled}
          variant={variant}
          index={index}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;