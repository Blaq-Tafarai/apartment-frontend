import { useState, useEffect } from 'react';
import { systemAuditLogs, auditLogStats, actionTypes } from '../mocks/systemAuditLogs.mock';

export const useSystemAuditLogs = ({ page = 1, limit = 10, search = '', action = '', status = '' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let filteredLogs = [...systemAuditLogs];
      
      // Apply search filter
      if (search) {
        filteredLogs = filteredLogs.filter(log => 
          log.description.toLowerCase().includes(search.toLowerCase()) ||
          log.performedBy.toLowerCase().includes(search.toLowerCase()) ||
          log.targetName.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Apply action filter
      if (action) {
        filteredLogs = filteredLogs.filter(log => log.action === action);
      }

      // Apply status filter
      if (status) {
        filteredLogs = filteredLogs.filter(log => log.status === status);
      }

      // Sort by timestamp descending
      filteredLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedData = filteredLogs.slice(start, end);

      setData(paginatedData);
      setTotal(filteredLogs.length);
      setTotalPages(Math.ceil(filteredLogs.length / limit));
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [page, limit, search, action, status]);

  return {
    data,
    isLoading,
    totalPages,
    total,
  };
};

export const useAuditLogStats = () => {
  return { ...auditLogStats };
};

export const useActionTypes = () => {
  return { data: actionTypes };
};

