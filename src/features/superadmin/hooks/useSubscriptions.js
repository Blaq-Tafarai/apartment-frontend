import { useState, useEffect } from 'react';
import { subscriptions, subscriptionStats, plans } from '../mocks/subscriptions.mock';

export const useSubscriptions = ({ page = 1, limit = 10, search = '', status = '', plan = '' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let filteredSubscriptions = [...subscriptions];
      
      // Apply search filter
      if (search) {
        filteredSubscriptions = filteredSubscriptions.filter(sub => 
          sub.company.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Apply status filter
      if (status) {
        filteredSubscriptions = filteredSubscriptions.filter(sub => 
          sub.status === status
        );
      }

      // Apply plan filter
      if (plan) {
        filteredSubscriptions = filteredSubscriptions.filter(sub => 
          sub.plan.toLowerCase() === plan.toLowerCase()
        );
      }

      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedData = filteredSubscriptions.slice(start, end);

      setData(paginatedData);
      setTotal(filteredSubscriptions.length);
      setTotalPages(Math.ceil(filteredSubscriptions.length / limit));
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [page, limit, search, status, plan]);

  return {
    data: {
      data,
      totalPages,
      total,
    },
    isLoading,
  };
};

export const useSubscriptionStats = () => {
  return { ...subscriptionStats };
};

export const usePlans = () => {
  return { data: plans };
};

export const useCreateSubscription = () => {
  return {
    mutateAsync: async (data) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Creating subscription:', data);
    },
    isLoading: false,
  };
};

export const useUpdateSubscription = () => {
  return {
    mutateAsync: async ({ id, ...data }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Updating subscription:', id, data);
    },
    isLoading: false,
  };
};

export const useCancelSubscription = () => {
  return {
    mutateAsync: async (id) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Cancelling subscription:', id);
    },
    isLoading: false,
  };
};

