import { useState, useEffect } from 'react';
import { allUsers, userStats } from '../mocks/users.mock';

export const useAllUsers = ({ page = 1, limit = 10, search = '' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let filteredUsers = [...allUsers];
      
      // Apply search filter
      if (search) {
        filteredUsers = filteredUsers.filter(user => 
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.company.toLowerCase().includes(search.toLowerCase())
        );
      }

      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedUsers = filteredUsers.slice(start, end);

      setData(paginatedUsers);
      setTotal(filteredUsers.length);
      setTotalPages(Math.ceil(filteredUsers.length / limit));
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [page, limit, search]);

  return {
    data: {
      data,
      totalPages,
      total,
    },
    isLoading,
  };
};

export const useUserStats = () => {
  return { ...userStats };
};

export const useCreateUser = () => {
  return {
    mutateAsync: async (data) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Creating user:', data);
    },
    isLoading: false,
  };
};

export const useUpdateUser = () => {
  return {
    mutateAsync: async ({ id, ...data }) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Updating user:', id, data);
    },
    isLoading: false,
  };
};

export const useDeleteUser = () => {
  return {
    mutateAsync: async (id) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Deleting user:', id);
    },
    isLoading: false,
  };
};

