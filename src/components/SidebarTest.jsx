import React from 'react';
import { PERMISSIONS, ROLE_PERMISSIONS } from '../context/RolePermissions';

// Test component to verify sidebar menu items for different roles
const SidebarTest = () => {
  const roles = ['superadmin', 'admin', 'manager', 'tenant'];

  const getMenuItemsForRole = (role) => {
    const user = { role };
    const baseItems = ['Dashboard'];

    if (ROLE_PERMISSIONS[role]?.includes(PERMISSIONS.MANAGE_USERS)) {
      baseItems.push('User Management');
    }

    if (ROLE_PERMISSIONS[role]?.includes(PERMISSIONS.MANAGE_APARTMENTS)) {
      baseItems.push('Apartments');
    }

    if (ROLE_PERMISSIONS[role]?.includes(PERMISSIONS.MANAGE_TENANTS)) {
      baseItems.push('Tenants');
    }

    if (ROLE_PERMISSIONS[role]?.includes(PERMISSIONS.VIEW_MAINTENANCE)) {
      baseItems.push('Maintenance');
    }

    if (ROLE_PERMISSIONS[role]?.includes(PERMISSIONS.VIEW_BILLING)) {
      baseItems.push('Billing');
    }

    if (ROLE_PERMISSIONS[role]?.includes(PERMISSIONS.MANAGE_SETTINGS)) {
      baseItems.push('Settings');
    }

    return baseItems;
  };

  return (
    <div className="p-6 bg-surface rounded-lg">
      <h2 className="text-xl font-bold mb-4">Sidebar Menu Items by Role</h2>
      {roles.map(role => (
        <div key={role} className="mb-4">
          <h3 className="font-semibold text-primary capitalize">{role}</h3>
          <p className="text-sm text-text-secondary">
            Menu Items: {getMenuItemsForRole(role).join(', ')}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SidebarTest;
