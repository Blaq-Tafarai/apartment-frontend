import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

const separators = {
  chevron: <ChevronRight className="w-4 h-4 text-text-tertiary" />,
  slash: <span className="text-text-tertiary">/</span>,
  dot: <span className="text-text-tertiary">•</span>,
};

/**
 * Breadcrumb Component
 * Navigation breadcrumb with multiple styles
 *
 * @param {array} items - Array of breadcrumb items
 * @param {string} separator - Separator: 'chevron', 'slash', 'dot'
 * @param {ReactNode} customSeparator - Custom separator element
 * @param {boolean} showHome - Show home icon
 * @param {function} onItemClick - Item click handler
 * @param {string} className - Additional CSS classes
 */
const Breadcrumb = ({
  items = [],
  separator = 'chevron',
  customSeparator,
  showHome = true,
  onItemClick,
  className = '',
}) => {

  const separatorElement = customSeparator || separators[separator];

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center flex-wrap gap-2">
        {showHome && (
          <>
            <li>
              <button
                onClick={() => onItemClick?.(0, { label: 'Home', href: '/' })}
                className="text-text-secondary hover:text-primary transition-colors"
                aria-label="Home"
              >
                <Home className="w-4 h-4" />
              </button>
            </li>
            {items.length > 0 && (
              <li aria-hidden="true">{separatorElement}</li>
            )}
          </>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              <li>
                {isLast ? (
                  <span
                    className="text-text-primary font-medium"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <button
                    onClick={() => onItemClick?.(index + 1, item)}
                    className="text-text-secondary hover:text-primary transition-colors hover:underline"
                  >
                    {item.label}
                  </button>
                )}
              </li>

              {!isLast && (
                <li aria-hidden="true">{separatorElement}</li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

/**
 * BreadcrumbCollapsed Component
 * Breadcrumb with collapsed middle items
 */
export const BreadcrumbCollapsed = ({
  items = [],
  maxItems = 3,
  separator = 'chevron',
  showHome = true,
  onItemClick,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (items.length <= maxItems) {
    return (
      <Breadcrumb
        items={items}
        separator={separator}
        showHome={showHome}
        onItemClick={onItemClick}
        className={className}
      />
    );
  }

  const firstItems = items.slice(0, 1);
  const middleItems = items.slice(1, -1);
  const lastItems = items.slice(-1);

  const visibleItems = isExpanded
    ? items
    : [...firstItems, ...lastItems];

  return (
    <Breadcrumb
      items={
        isExpanded
          ? items
          : [
              ...firstItems,
              {
                label: (
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="px-2 hover:bg-surface-variant rounded"
                  >
                    ...
                  </button>
                ),
              },
              ...lastItems,
            ]
      }
      separator={separator}
      showHome={showHome}
      onItemClick={onItemClick}
      className={className}
    />
  );
};

export default Breadcrumb;