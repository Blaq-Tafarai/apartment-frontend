// Permission checking utilities

import { ROLE_PERMISSIONS, PERMISSIONS } from '../context/RolePermissions';

/**
 * Check if a user has a specific permission
 * @param {Object} user - The user object with role property
 * @param {string} permission - The permission to check
 * @returns {boolean} - True if user has the permission
 */
export const hasPermission = (user, permission) => {
  if (!user || !user.role) return false;

  const userPermissions = ROLE_PERMISSIONS[user.role];
  return userPermissions ? userPermissions.includes(permission) : false;
};

/**
 * Check if a user has any of the specified permissions
 * @param {Object} user - The user object with role property
 * @param {Array<string>} permissions - Array of permissions to check
 * @returns {boolean} - True if user has at least one of the permissions
 */
export const hasAnyPermission = (user, permissions) => {
  return permissions.some(permission => hasPermission(user, permission));
};

/**
 * Check if a user has all of the specified permissions
 * @param {Object} user - The user object with role property
 * @param {Array<string>} permissions - Array of permissions to check
 * @returns {boolean} - True if user has all permissions
 */
export const hasAllPermissions = (user, permissions) => {
  return permissions.every(permission => hasPermission(user, permission));
};

/**
 * Get all permissions for a user's role
 * @param {Object} user - The user object with role property
 * @returns {Array<string>} - Array of permissions
 */
export const getUserPermissions = (user) => {
  if (!user || !user.role) return [];
  return ROLE_PERMISSIONS[user.role] || [];
};

/**
 * Check if user has a specific role
 * @param {Object} user - The user object with role property
 * @param {string} role - The role to check
 * @returns {boolean} - True if user has the role
 */
export const hasRole = (user, role) => {
  return user && user.role === role;
};

/**
 * Check if user has any of the specified roles
 * @param {Object} user - The user object with role property
 * @param {Array<string>} roles - Array of roles to check
 * @returns {boolean} - True if user has at least one of the roles
 */
export const hasAnyRole = (user, roles) => {
  return roles.includes(user?.role);
};
