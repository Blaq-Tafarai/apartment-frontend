import React from 'react';
import { lazy, Suspense } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { SkeletonCard } from '../../../components/ui/Skeleton';

// Lazy load dashboard components
const AdminDashboard = lazy(() => import('./AdminDashboard'));
const ManagerDashboard = lazy(() => import('./ManagerDashboard'));
const TenantDashboard = lazy(() => import('./TenantDashboard'));

const DashboardPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen p-8 space-y-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <SkeletonCard showImage={false} />
            <SkeletonCard showImage={false} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-8">
            <div className="space-y-4 animate-pulse">
              <SkeletonCard showImage={false} />
              <SkeletonCard showImage={false} />
            </div>
          </div>
          <div className="card p-8">
            <div className="space-y-4 animate-pulse">
              <SkeletonCard showImage={false} />
              <SkeletonCard showImage={false} />
            </div>
          </div>
          <div className="card p-8">
            <div className="space-y-4 animate-pulse">
              <SkeletonCard showImage={false} />
              <SkeletonCard showImage={false} />
            </div>
          </div>
          <div className="card p-8">
            <div className="space-y-4 animate-pulse">
              <SkeletonCard showImage={false} />
              <SkeletonCard showImage={false} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Role-based dashboard selection
  const DashboardComponent = {
    'admin': AdminDashboard,
    'manager': ManagerDashboard,
    'tenant': TenantDashboard,
    'superadmin': AdminDashboard
  }[user?.role] || AdminDashboard;

  return (
    <Suspense 
      fallback={
        <div className="min-h-screen p-8 space-y-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="animate-pulse h-12 w-64 bg-surface rounded-xl" />
              <div className="animate-pulse h-4 w-80 bg-surface rounded" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{Array(4).fill().map((_, i) => (
              <div key={'skeleton-' + i} className="card p-8">
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 w-24 bg-surface rounded" />
                  <div className="h-12 w-32 bg-surface rounded-lg" />
                  <div className="flex gap-2">
                    <div className="h-3 w-12 bg-surface rounded-full" />
                    <div className="h-3 w-8 bg-surface rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <DashboardComponent />
    </Suspense>
  );
};

export default DashboardPage;

