import React from 'react';

const variants = {
  text: 'rounded h-4',
  circular: 'rounded-full',
  rectangular: 'rounded-none',
  rounded: 'rounded-lg',
};

const sizes = {
  sm: '32px',
  md: '40px',
  lg: '56px',
  xl: '72px',
};

/**
 * Skeleton Component
 * Loading placeholder with pulse animation
 *
 * @param {string} variant - Shape variant: 'text', 'circular', 'rectangular', 'rounded'
 * @param {string} width - Width (CSS value)
 * @param {string} height - Height (CSS value)
 * @param {boolean} animation - Enable pulse animation
 * @param {string} className - Additional CSS classes
 */
const Skeleton = ({
  variant = 'text',
  width,
  height,
  animation = true,
  className = '',
  ...props
}) => {

  const style = {
    width: width || (variant === 'circular' ? '40px' : '100%'),
    height: height || (variant === 'circular' ? '40px' : undefined),
  };

  return (
    <div
      className={`
        bg-gray-200 dark:bg-gray-700
        ${variants[variant]}
        ${animation ? 'animate-pulse' : ''}
        ${className}
      `}
      style={style}
      aria-hidden="true"
      role="presentation"
      {...props}
    />
  );
};

/**
 * SkeletonText Component
 * Multiple text lines skeleton
 */
export const SkeletonText = ({
  lines = 3,
  spacing = 2,
  lastLineWidth = '60%',
  className = '',
}) => {
  return (
    <div className={`space-y-${spacing} ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? lastLineWidth : '100%'}
        />
      ))}
    </div>
  );
};

/**
 * SkeletonCard Component
 * Card layout skeleton
 */
export const SkeletonCard = ({
  showImage = true,
  imageHeight = '200px',
  showAvatar = false,
  lines = 3,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Image */}
      {showImage && (
        <Skeleton variant="rounded" height={imageHeight} />
      )}

      {/* Avatar and Header */}
      <div className="flex items-center gap-3">
        {showAvatar && (
          <Skeleton variant="circular" width="40px" height="40px" />
        )}
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="60%" />
        </div>
      </div>

      {/* Content Lines */}
      <SkeletonText lines={lines} />

      {/* Actions */}
      <div className="flex gap-2">
        <Skeleton variant="rounded" width="80px" height="36px" />
        <Skeleton variant="rounded" width="80px" height="36px" />
      </div>
    </div>
  );
};

/**
 * SkeletonTable Component
 * Table layout skeleton
 */
export const SkeletonTable = ({
  rows = 5,
  columns = 4,
  showHeader = true,
  className = '',
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header */}
      {showHeader && (
        <div className="flex gap-4">
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton
              key={index}
              variant="text"
              width={`${100 / columns}%`}
              height="20px"
            />
          ))}
        </div>
      )}

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              variant="text"
              width={`${100 / columns}%`}
              height="16px"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

/**
 * SkeletonAvatar Component
 * Avatar with name skeleton
 */
export const SkeletonAvatar = ({
  size = 'md',
  showName = true,
  className = '',
}) => {

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Skeleton
        variant="circular"
        width={sizes[size]}
        height={sizes[size]}
      />
      {showName && (
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="120px" />
          <Skeleton variant="text" width="80px" />
        </div>
      )}
    </div>
  );
};

/**
 * SkeletonList Component
 * List items skeleton
 */
export const SkeletonList = ({
  items = 5,
  showAvatar = true,
  lines = 2,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-start gap-3">
          {showAvatar && (
            <Skeleton variant="circular" width="40px" height="40px" />
          )}
          <div className="flex-1 space-y-2">
            {Array.from({ length: lines }).map((_, lineIndex) => (
              <Skeleton
                key={lineIndex}
                variant="text"
                width={lineIndex === lines - 1 ? '60%' : '100%'}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * SkeletonForm Component
 * Form layout skeleton
 */
export const SkeletonForm = ({
  fields = 4,
  showButton = true,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: fields }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton variant="text" width="120px" height="14px" />
          <Skeleton variant="rounded" height="42px" />
        </div>
      ))}

      {showButton && (
        <Skeleton variant="rounded" width="120px" height="42px" />
      )}
    </div>
  );
};

export default Skeleton;