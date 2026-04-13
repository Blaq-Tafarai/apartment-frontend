import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, AuthProvider, useAuth } from './context';
import { MainLayout, BlankLayout } from './layouts';
import RoleGuard from './components/RoleGuard';
import { ToastProvider } from './components/ui/Toast';

// Lazy load pages
const LoginPage = lazy(() => import('./features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('./features/auth/pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./features/auth/pages/ForgotPasswordPage'));
const VerifyOtpPage = lazy(() => import('./features/auth/pages/VerifyOtpPage'));
const ResetPasswordPage = lazy(() => import('./features/auth/pages/ResetPasswordPage'));
const DashboardPage = lazy(() => import('./features/dashboard/pages/DashboardPage'));
const ListApartments = lazy(() => import('./features/apartment/pages/ListApartments'));
const ListBuildings = lazy(() => import('./features/building/pages/ListBuildings'));
const ListTenants = lazy(() => import('./features/tenants/pages/ListTenants'));
const ListMaintenance = lazy(() => import('./features/maintenance/pages/ListMaintenance'));
const ListInvoices = lazy(() => import('./features/billing/pages/ListInvoices'));
const ListDocuments = lazy(() => import('./features/document/pages/ListDocuments'));
const ListExpenses = lazy(() => import('./features/expenses/pages/ListExpenses'));
const ListLeases = lazy(() => import('./features/lease/pages/ListLeases'));
const ListAuditLogs = lazy(() => import('./features/auditLog/pages/ListAuditLogs'));
const ListReports = lazy(() => import('./features/report/pages/ListReports'));
const ListPayments = lazy(() => import('./features/payments/pages/ListPayments'));
const ListCompanies = lazy(() => import('./features/companies/pages/ListCompanies'));
const ListLicenses = lazy(() => import('./features/licenses/pages/ListLicenses'));
const SettingsPage = lazy(() => import('./features/settings/pages/SettingsPage'));
const ErrorBoundary = lazy(() => import('./components/ErrorBoundary'));
const AllComponentsExample = lazy(() => import('./features/test/AllComponentsExample'));
const SidebarTest = lazy(() => import('./components/SidebarTest'));
const NotFoundPage = lazy(() => import('./features/notfound/NotFoundPage'));

// Superadmin pages
const SuperadminDashboard = lazy(() => import('./features/superadmin/pages/SuperadminDashboard'));
const ListAllUsers = lazy(() => import('./features/superadmin/pages/ListAllUsers'));
const ListSubscriptions = lazy(() => import('./features/superadmin/pages/ListSubscriptions'));
const PlatformSettings = lazy(() => import('./features/superadmin/pages/PlatformSettings'));
const ListSystemAuditLogs = lazy(() => import('./features/superadmin/pages/ListSystemAuditLogs'));

// --------------------
// Protected Route
// --------------------
const ProtectedRoute = ({ children, roles, permissions, requireAll = false }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-text-primary">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check mustChangePassword
  if (user?.mustChangePassword !== true) {
    return <Navigate to="/reset-password" replace />;
  }

  // If roles or permissions are specified, use RoleGuard
  if (roles || permissions) {
    return (
      <RoleGuard
        roles={roles}
        permissions={permissions}
        requireAll={requireAll}
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="p-6 bg-surface rounded-lg border border-border-color max-w-md text-center">
              <h2 className="text-xl font-semibold text-text-primary mb-2">Access Denied</h2>
              <p className="text-text-secondary">You don't have permission to access this page.</p>
            </div>
          </div>
        }
      >
        {children}
      </RoleGuard>
    );
  }

  return children;
};

// --------------------
// React Query client
// --------------------
const queryClient = new QueryClient();

// --------------------
// App Component
// --------------------
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <ToastProvider>
              <ErrorBoundary fallback={<div className="p-4 text-red-600">Something went wrong!</div>}>
                <Suspense
                  fallback={
                    <div className="min-h-screen flex items-center justify-center bg-background">
                      <div className="animate-pulse text-text-primary">Loading...</div>
                    </div>
                  }
                >
                  <Routes>
                    {/* Blank Layout Routes (No sidebar/header) */}
                    <Route element={<BlankLayout />}>
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                      <Route path="/verify-otp" element={<VerifyOtpPage />} />
                      <Route path="/reset-password" element={<ResetPasswordPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Route>

                    {/* Protected Routes */}
                    <Route
                      path="/"
                      element={
                        <ProtectedRoute>
                          <MainLayout />
                        </ProtectedRoute>
                      }
                    >
                      <Route index element={<Navigate to="/dashboard" />} />
                      <Route path="dashboard" element={<DashboardPage />} />
                      {/* Apartments - Admin and Manager */}
                      <Route
                        path="apartments"
                        element={
                          <ProtectedRoute>
                            <ListApartments />
                          </ProtectedRoute>
                        }
                      />
                      {/* Tenants - Admin and Manager */}
                      <Route
                        path="tenants"
                        element={
                          <ProtectedRoute>
                            <ListTenants />
                          </ProtectedRoute>
                        }
                      />
                      {/* Maintenance - All authenticated users */}
                      <Route path="maintenance" element={<ListMaintenance />} />
                      {/* Billing - Admin only */}
                      <Route
                        path="billing"
                        element={
                          <ProtectedRoute>
                            <ListInvoices />
                          </ProtectedRoute>
                        }
                      />
                      {/* Buildings - Admin and Manager */}
                      <Route
                        path="buildings"
                        element={
                          <ProtectedRoute>
                            <ListBuildings />
                          </ProtectedRoute>
                        }
                      />
                      {/* Documents - All authenticated users */}
                      <Route path="documents" element={<ListDocuments />} />
                      {/* Expenses - Admin and Manager */}
                      <Route
                        path="expenses"
                        element={
                          <ProtectedRoute>
                            <ListExpenses />
                          </ProtectedRoute>
                        }
                      />
                      {/* Leases - Admin and Manager */}
                      <Route
                        path="leases"
                        element={
                          <ProtectedRoute>
                            <ListLeases />
                          </ProtectedRoute>
                        }
                      />
                      {/* Audit Logs - Admin only */}
                      <Route
                        path="audit-logs"
                        element={
                          <ProtectedRoute>
                            <ListAuditLogs />
                          </ProtectedRoute>
                        }
                      />
                      {/* Reports - Admin and Manager */}
                      <Route
                        path="reports"
                        element={
                          <ProtectedRoute>
                            <ListReports />
                          </ProtectedRoute>
                        }
                      />
                      {/* Payments - Admin and Manager */}
                      <Route
                        path="payments"
                        element={
                          <ProtectedRoute>
                            <ListPayments />
                          </ProtectedRoute>
                        }
                      />

                        {/* Companies - Superadmin only */}
                        <Route
                          path="companies"
                          element={
                            <ProtectedRoute>
                              <ListCompanies />
                            </ProtectedRoute>
                          }
                        />

                        {/* Licenses - Superadmin only */}
                        <Route
                          path="licenses"
                          element={
                            <ProtectedRoute>
                              <ListLicenses />
                            </ProtectedRoute>
                          }
                        />
                        
                        {/* Superadmin Routes - Superadmin only */}

                        <Route
                          path="superadmin-dashboard"
                          element={
                            <ProtectedRoute roles={['superadmin']}>
                              <SuperadminDashboard />

                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="users"
                          element={
                            <ProtectedRoute roles={['superadmin']}>
                              <ListAllUsers />

                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="subscriptions"
                          element={
                            <ProtectedRoute roles={['superadmin']}>
                              <ListSubscriptions />

                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="platform-settings"
                          element={
                            <ProtectedRoute roles={['superadmin']}>
                              <PlatformSettings />

                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="system-logs"
                          element={
                            <ProtectedRoute roles={['superadmin']}>
                              <ListSystemAuditLogs />

                            </ProtectedRoute>
                          }
                        />
                      {/* Settings - All authenticated users */}
                      <Route path="settings" element={<SettingsPage />} />
                      {/* Test components - Superadmin only */}
                      <Route
                        path="test/components"
                        element={
                          <ProtectedRoute>
                            <AllComponentsExample />
                          </ProtectedRoute>
                        }
                      />
                      {/* Sidebar Test - All authenticated users */}
                      <Route path="test/sidebar" element={<SidebarTest />} />
                    </Route>
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </ToastProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
