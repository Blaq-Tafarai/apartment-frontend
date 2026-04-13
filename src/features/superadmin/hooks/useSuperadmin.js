import { useState, useEffect } from 'react';
import { 
  platformStats, 
  revenueData, 
  subscriptionTypeData, 
  recentCompanies, 
  recentActivities 
} from '../mocks/superadmin.mock';

export const useSuperadminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return {
    stats: platformStats,
    revenueData,
    subscriptionTypeData,
    recentCompanies,
    recentActivities,
    isLoading,
  };
};

