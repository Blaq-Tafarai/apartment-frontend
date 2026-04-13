import React, { useState } from 'react';

/**
 * Tabs Component
 * Flexible tabs with multiple variants
 * 
 * @param {array} tabs - Array of tab objects
 * @param {number} activeTab - Active tab index
 * @param {function} onChange - Tab change handler
 * @param {string} variant - Style variant: 'default', 'pills', 'underline', 'enclosed'
 * @param {string} size - Size: 'sm', 'md', 'lg'
 * @param {string} color - Color theme
 * @param {string} orientation - Layout: 'horizontal', 'vertical'
 * @param {boolean} fullWidth - Make tabs full width
 * @param {string} className - Additional CSS classes
 */
const Tabs = ({
  tabs = [],
  activeTab = 0,
  onChange,
  variant = 'default',
  size = 'md',
  color = 'primary',
  orientation = 'horizontal',
  fullWidth = false,
  className = '',
}) => {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const renderTab = (tab, index) => {
    const isActive = activeTab === index;
    const isDisabled = tab.disabled;

    let tabClasses = `
      ${sizes[size]}
      font-medium transition-all duration-200
      ${fullWidth && orientation === 'horizontal' ? 'flex-1' : ''}
      ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `;

    // Variant-specific styles
    switch (variant) {
      case 'pills':
        tabClasses += `
          rounded-full
          ${isActive
            ? 'bg-primary text-white shadow-md'
            : 'text-text-secondary hover:bg-surface-variant'
          }
        `;
        break;

      case 'underline':
        tabClasses += `
          border-b-2 rounded-t
          ${isActive
            ? 'border-primary text-primary'
            : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border-color'
          }
        `;
        break;

      case 'enclosed':
        tabClasses += `
          border rounded-t
          ${isActive
            ? 'border-border-color border-b-transparent bg-surface text-primary -mb-px'
            : 'border-transparent text-text-secondary hover:text-text-primary'
          }
        `;
        break;

      default: // 'default'
        tabClasses += `
          rounded
          ${isActive
            ? 'bg-surface-variant text-primary'
            : 'text-text-secondary hover:bg-surface'
          }
        `;
    }

    return (
      <button
        key={index}
        onClick={() => !isDisabled && onChange?.(index)}
        onKeyDown={(e) => {
          if (isDisabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange?.(index);
          }
        }}
        disabled={isDisabled}
        className={tabClasses}
        role="tab"
        aria-selected={isActive}
        aria-disabled={isDisabled}
        tabIndex={isActive ? 0 : -1}
      >
        <div className="flex items-center justify-center gap-2">
          {tab.icon && <span className="flex-shrink-0">{React.createElement(tab.icon)}</span>}
          <span>{tab.label}</span>
          {tab.badge && (
            <span className="px-1.5 py-0.5 text-xs bg-primary text-white rounded-full">
              {tab.badge}
            </span>
          )}
        </div>
      </button>
    );
  };

  return (
    <div
      className={`
        ${orientation === 'vertical' ? 'flex gap-4' : ''}
        ${className}
      `}
    >
      {/* Tab List */}
      <div
        className={`
          flex
          ${orientation === 'vertical' ? 'flex-col' : 'flex-row'}
          ${variant === 'underline' ? 'border-b border-border-color' : ''}
          ${variant === 'enclosed' ? 'border-b border-border-color' : ''}
          ${fullWidth && orientation === 'horizontal' ? 'w-full' : ''}
          gap-1
        `}
        role="tablist"
        aria-orientation={orientation}
      >
        {tabs.map((tab, index) => renderTab(tab, index))}
      </div>

      {/* Tab Panel */}
      <div
        className={`
          ${orientation === 'vertical' ? 'flex-1' : 'mt-4'}
        `}
        role="tabpanel"
      >
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

/**
 * SimpleTabs Component
 * Simpler tabs without panel management
 */
export const SimpleTabs = ({
  tabs = [],
  activeTab,
  onChange,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className = '',
}) => {
  return (
    <Tabs
      tabs={tabs.map(tab => ({ ...tab, content: null }))}
      activeTab={activeTab}
      onChange={onChange}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
    />
  );
};

/**
 * ControlledTabs Component
 * Tabs with internal state management
 */
export const ControlledTabs = ({
  tabs = [],
  defaultTab = 0,
  variant = 'default',
  size = 'md',
  orientation = 'horizontal',
  fullWidth = false,
  className = '',
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleChange = (index) => {
    setActiveTab(index);
    onTabChange?.(index);
  };

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onChange={handleChange}
      variant={variant}
      size={size}
      orientation={orientation}
      fullWidth={fullWidth}
      className={className}
    />
  );
};

export default Tabs;