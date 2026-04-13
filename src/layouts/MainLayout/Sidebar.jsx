import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  Wrench,
  Receipt,
  User,
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
  DollarSign,
  FileSignature,
  Activity,
  BarChart3,
  CreditCard,
  Crown,
  UserCog,
  Shield,
  ClipboardList,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

/* ─────────────────────────────────────────────────────────────────────
   Menu data — grouped for section labels
───────────────────────────────────────────────────────────────────── */
const menuGroups = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['superadmin', 'admin', 'manager', 'tenant'] },
    ],
  },
  {
    id: 'property',
    label: 'Property',
    items: [
      { icon: Building2, label: 'Buildings', path: '/buildings', roles: ['admin'] },
      { icon: LayoutDashboard, label: 'Apartments', path: '/apartments', roles: ['admin', 'manager'] },
      { icon: Users, label: 'Tenants', path: '/tenants', roles: ['admin', 'manager'] },
    ],
  },
  {
    id: 'operations',
    label: 'Operations',
    items: [
      { icon: FileSignature, label: 'Leases', path: '/leases', roles: ['admin', 'manager'] },
      { icon: Wrench, label: 'Maintenance', path: '/maintenance', roles: ['admin', 'manager', 'tenant'] },
      { icon: FileText, label: 'Documents', path: '/documents', roles: ['admin', 'manager', 'tenant'] }
    ],
  },
  {
    id: 'financials',
    label: 'Financials',
    items: [
      { icon: Receipt, label: 'Billing', path: '/billing', roles: ['admin', 'manager', 'tenant'] },
      { icon: DollarSign, label: 'Expenses', path: '/expenses', roles: ['admin', 'manager'] },
      { icon: CreditCard, label: 'Payments', path: '/payments', roles: ['admin', 'manager'] },
    ],
  },
  {
    id: 'superadmin',
    label: 'Platform',
    items: [
      { icon: Building2, label: 'Companies', path: '/companies', roles: ['superadmin'] },
      { icon: FileText, label: 'Licenses', path: '/licenses', roles: ['superadmin'] },
      { icon: UserCog, label: 'User Management', path: '/users', roles: ['superadmin', 'admin'] },
      { icon: Receipt, label: 'Subscriptions', path: '/subscriptions', roles: ['superadmin'] },
      { icon: Shield, label: 'Platform Settings', path: '/platform-settings', roles: ['superadmin'] },
      { icon: ClipboardList, label: 'System Logs', path: '/system-logs', roles: ['superadmin'] },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    items: [
      { icon: BarChart3, label: 'Reports', path: '/reports', roles: ['admin', 'manager'] },
      { icon: Activity, label: 'Audit Logs', path: '/audit-logs', roles: ['admin'] },
    ],
  },
  {
    id: 'account',
    label: null,
    items: [
      { icon: User, label: 'Profile', path: '/settings', roles: ['superadmin', 'admin', 'manager', 'tenant'] },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────────────── */
const getInitials = (str = '') =>
  str.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'U';

/* Smooth height-animated collapse panel */
function CollapsePanel({ open, children }) {
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!innerRef.current) return;
    setHeight(open ? innerRef.current.scrollHeight : 0);
  }, [open]);

  return (
    <div
      style={{
        overflow: 'hidden',
        height: `${height}px`,
        transition: 'height 0.28s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────── */
const Sidebar = () => {
  const { sidebarCollapsed, toggleSidebar, sidebar } = useTheme();
  const { user } = useAuth();
  const [isCollapsedDesktop, setIsCollapsedDesktop] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const location = useLocation();

  const userRole   = user?.role  || 'tenant';
  const userName   = user?.name  || user?.email || 'User';
  const collapsed  = isCollapsedDesktop;

  /* Sync CSS variable */
  useEffect(() => {
    const root = document.documentElement;
    if (sidebar !== 'horizontal') {
      root.style.setProperty('--sidebar-width', collapsed ? '72px' : '256px');
    } else {
      root.style.setProperty('--sidebar-width', '0px');
    }
  }, [collapsed, sidebar]);

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', '256px');
  }, []);

  const toggleDesktopCollapse = () => {
    setIsCollapsedDesktop(p => !p);
    if (!isCollapsedDesktop) setExpandedMenus({});
  };

  const toggleSubmenu = path =>
    setExpandedMenus(p => ({ ...p, [path]: !p[path] }));

  /* Visible groups */
  const visibleGroups = menuGroups
    .map(g => ({ ...g, items: g.items.filter(i => i.roles.includes(userRole)) }))
    .filter(g => g.items.length > 0);

  /* ── HORIZONTAL ─────────────────────────────────────────────────── */
  if (sidebar === 'horizontal') {
    return (
      <nav className="bg-surface border-b border-border-color sticky top-0 w-full z-40"
           style={{ backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center gap-1 overflow-x-auto px-4 py-2"
             style={{ scrollbarWidth: 'none' }}>
          {visibleGroups.flatMap(g => g.items).map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3.5 py-2 rounded-lg whitespace-nowrap
                   text-sm font-medium transition-all duration-150
                   ${isActive
                     ? 'bg-primary text-white shadow-sm'
                     : 'text-text-secondary hover:bg-surface-variant hover:text-text-primary'}`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </nav>
    );
  }

  /* ── VERTICAL ───────────────────────────────────────────────────── */
  return (
    <>
      {/* Mobile overlay */}
      {sidebarCollapsed && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full bg-surface border-r border-border-color z-30
          flex flex-col
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ width: 'var(--sidebar-width)' }}
      >

        {/* ── Logo ── */}
        <div
          className="flex items-center gap-3 border-b border-border-color flex-shrink-0"
          style={{
            height: 'var(--header-height, 64px)',
            padding: collapsed ? '0 16px' : '0 18px',
          }}
        >
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-md">
            <Building2 className="w-4 h-4 text-white" />
          </div>

          {!collapsed && (
            <span className="font-bold text-base text-text-primary whitespace-nowrap overflow-hidden"
                  style={{ letterSpacing: '-0.02em' }}>
              ApartHub
            </span>
          )}

          {!collapsed && (
            <button
              onClick={toggleSidebar}
              className="ml-auto p-1.5 rounded-lg text-text-secondary hover:bg-surface-variant hover:text-text-primary transition-colors lg:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* ── Nav ── */}
        <nav
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{
            padding: collapsed ? '10px 8px' : '10px 10px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>{`
            .overflow-y-auto::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {visibleGroups.map((group, gi) => (
            <div key={group.id} className={gi > 0 ? 'mt-1' : ''}>

              {/* Section label */}
              {group.label && !collapsed && (
                <p
                  className="text-text-secondary px-2 pt-3 pb-1"
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.09em',
                    textTransform: 'uppercase',
                    opacity: 0.5,
                  }}
                >
                  {group.label}
                </p>
              )}

              {/* Thin divider when collapsed or unlabeled groups separated */}
              {gi > 0 && (collapsed || !group.label) && (
                <div className="border-t border-border-color my-2 mx-2" style={{ opacity: 0.6 }} />
              )}

              {group.items.map(item => {
                const Icon     = item.icon;

                const isActive = location.pathname === item.path || 
                  (item.path !== '/' && location.pathname.startsWith(item.path + '/')) ||
                  location.pathname === item.path;

                const isOpen   = !!expandedMenus[item.path];

                return (
                  <div key={item.path} className="relative mb-0.5">

                    {collapsed
                      /* ── Icon-only pill + tooltip ── */
                      ? (
                        <div className="group relative">

                          <NavLink
                            to={item.path}
                            onClick={() => window.innerWidth < 1024 && toggleSidebar()}

                            className={({ isActive: a }) =>
                              `flex items-center justify-center rounded-xl transition-all duration-150
                               ${a
                                 ? 'bg-primary text-white shadow-md'
                                 : 'text-text-secondary hover:bg-surface-variant hover:text-text-primary'
                               }`
                            }
                            style={{ padding: '10px', width: '100%' }}
                          >
                            <Icon className="w-[18px] h-[18px]" />
                          </NavLink>

                          {/* Tooltip */}
                          <div
                            className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3
                                       px-3 py-1.5 rounded-lg z-50
                                       bg-surface border border-border-color text-text-primary
                                       text-xs font-semibold whitespace-nowrap
                                       opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                       transition-all duration-150"
                            style={{
                              transitionDelay: '0.25s',
                              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                            }}
                          >
                            {item.label}
                          </div>
                        </div>
                      )

                      /* ── Full nav item ── */
                      : (

                        <NavLink
                          to={item.path}
                          onClick={() => window.innerWidth < 1024 && toggleSidebar()}

                          className={({ isActive: a }) =>
                            `group relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
                             text-sm font-medium transition-all duration-150 overflow-hidden
                             ${a
                               ? 'bg-primary text-white shadow-md'
                               : 'text-text-secondary hover:bg-surface-variant hover:text-text-primary'
                             }`
                          }
                        >
                          {({ isActive: a }) => (
                            <>
                              {/* Active left accent */}
                              {a && (
                                <span
                                  className="absolute right-0 top-[22%] bottom-[22%] w-[5px] rounded-l-full bg-white"
                                  style={{ opacity: 0.55 }}
                                />
                              )}

                              <Icon
                                className={`w-[17px] h-[17px] flex-shrink-0 transition-transform duration-150
                                  ${!a ? 'group-hover:translate-x-0.5' : ''}`}
                              />

                              <span className="flex-1 truncate">{item.label}</span>
                            </>
                          )}
                        </NavLink>
                      )
                    }
                  </div>
                );
              })}
            </div>
          ))}
        </nav>

        {/* ── Desktop collapse toggle ── */}
        <button
          onClick={toggleDesktopCollapse}
          className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2
                     w-6 h-6 rounded-full bg-primary text-white z-10
                     items-center justify-center
                     hover:scale-110 active:scale-95 transition-transform duration-150 shadow-md"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed
            ? <ChevronRight className="w-3.5 h-3.5" />
            : <ChevronLeft  className="w-3.5 h-3.5" />
          }
        </button>

        {/* ── Footer ── */}
        <div className="flex-shrink-0 border-t border-border-color p-3">
          {collapsed
            ? (
              <div className="flex justify-center">
                <div
                  className="w-9 h-9 rounded-xl bg-primary text-white
                             flex items-center justify-center text-xs font-bold
                             cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
                >
                  {getInitials(userName)}
                </div>
              </div>
            )
            : (
              <>
                <div
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-xl
                             bg-surface-variant border border-border-color
                             cursor-pointer transition-all duration-150
                             hover:bg-surface-variant hover:border-primary/40"
                >
                  {/* Avatar */}
                  <div
                    className="w-8 h-8 rounded-lg bg-primary text-white flex-shrink-0
                               flex items-center justify-center text-xs font-bold shadow-sm"
                  >
                    {getInitials(userName)}
                  </div>

                  {/* Name + role */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-text-primary truncate leading-snug">
                      {userName}
                    </p>
                    <p className="text-text-secondary capitalize leading-snug"
                       style={{ fontSize: '11px' }}>
                      {userRole}
                    </p>
                  </div>

                  {/* Profile icon — appears on hover */}
                  <User
                    className="w-3.5 h-3.5 text-text-secondary flex-shrink-0
                               opacity-0 group-hover:opacity-60 transition-opacity duration-150"
                  />
                </div>

                <p
                  className="text-center mt-2 text-text-secondary"
                  style={{ fontSize: '10px', opacity: 0.38 }}
                >
                  v1.0.0 · © 2024 ApartHub
                </p>
              </>
            )
          }
        </div>
      </aside>
    </>
  );
};

export default Sidebar;