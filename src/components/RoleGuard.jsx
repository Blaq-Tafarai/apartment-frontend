import React from 'react';
import { useAuth } from '../context/AuthContext';
import { hasPermission, hasRole, hasAnyRole, hasAnyPermission, hasAllPermissions } from '../utils/permissions';

/**
 * RoleGuard component for conditional rendering based on user roles/permissions
 * @param {Object} props
 * @param {string|string[]} props.roles - Required roles (if provided)
 * @param {string|string[]} props.permissions - Required permissions (if provided)
 * @param {ReactNode} props.children - Content to render if access granted
 * @param {ReactNode} props.fallback - Content to render if access denied (optional)
 * @param {boolean} props.requireAll - Whether all permissions are required (default: false)
 * @returns {ReactNode}
 */
const RoleGuard = ({
  roles,
  permissions,
  children,
  fallback = null,
  requireAll = false
}) => {
  const { user, isAuthenticated } = useAuth();

  // If not authenticated, don't render anything
  if (!isAuthenticated || !user) {
    return fallback;
  }

  // Check roles if provided
  if (roles) {
    const rolesArray = Array.isArray(roles) ? roles : [roles];
    if (!hasAnyRole(user, rolesArray)) {
      return fallback;
    }
  }

  // Check permissions if provided
  if (permissions) {
    const permissionsArray = Array.isArray(permissions) ? permissions : [permissions];

    if (requireAll) {
      if (!hasAllPermissions(user, permissionsArray)) {
        return fallback;
      }
    } else {
      if (!hasAnyPermission(user, permissionsArray)) {
        return fallback;
      }
    }
  }

  // If no roles or permissions specified, or user has access, render children
  return children;
};

export default RoleGuard;
