import { useQuery } from '@tanstack/react-query';
import { apartmentService } from '../../apartment/services/apartmentService';
import { tenantService } from '../../tenants/services/tenantService';
import { maintenanceService } from '../../maintenance/services/maintenanceService';
import { billingService } from '../../billing/services/billingService';
import { mockInvoices } from '../../billing/mocks/invoices.mock';
import { apartments } from '../../apartment/mocks/apartments.mock';
import { mockTenants as tenants } from '../../tenants/mocks/tenants.mock';
import { mockMaintenance as maintenanceRequests } from '../../maintenance/mocks/maintenance.mock';

// Aggregate dashboard stats for Admin
const computeAdminStats = (apartmentsData, tenantsData, maintenanceData, invoicesData) => {
  const apartmentsList = apartmentsData?.data || apartments;
  const tenantsList = tenantsData?.data || tenants;
  const maintenanceList = maintenanceData?.data || maintenanceRequests;
  const invoicesList = invoicesData || mockInvoices;

  // Stats Cards
  const totalApartments = apartmentsList.length;
  const activeTenants = tenantsList.filter(t => t.status === 'Active').length;
  const openMaintenance = maintenanceList.filter(m => m.status === 'OPEN' || m.status === 'IN_PROGRESS').length;
  const monthlyRevenue = invoicesList
    .filter(i => i.status === 'Paid' && new Date(i.issueDate).getMonth() === new Date().getMonth())
    .reduce((sum, i) => sum + i.amount, 0);

  // Occupancy
  const occupiedApartments = apartmentsList.filter(a => a.status === 'Occupied').length;
  const occupancyRate = totalApartments > 0 ? Math.round((occupiedApartments / totalApartments) * 100) : 0;

  // Recent Activity (last 5)
  const recentActivity = [
    ...maintenanceList.slice(0, 2).map(m => ({
      id: `m${m.id}`,
      type: 'maintenance',
      message: `New maintenance request - ${m.apartment?.number || 'Apt'}`,
      time: '5 min ago'
    })),
    ...invoicesList.slice(0, 2).map(i => ({
      id: `p${i.id}`,
      type: 'payment',
      message: `Payment received from ${i.tenant}`,
      time: '1 hour ago'
    })),
    ...tenantsList.slice(0, 1).map(t => ({
      id: `t${t.id}`,
      type: 'tenant',
      message: `New tenant application - ${t.apartment?.number}`,
      time: '2 hours ago'
    }))
  ];

  // Upcoming Expirations (mock leases)
  const upcomingExpirations = [
    { id: 1, type: 'lease', item: 'Lease - Apt 304', date: 'In 5 days', urgent: true },
    { id: 2, type: 'insurance', item: 'Insurance Policy', date: 'In 12 days', urgent: false },
  ];

  // Chart data
  const revenueData = [
    { month: 'Jan', revenue: 35000 },
    { month: 'Feb', revenue: 38000 },
    { month: 'Mar', revenue: 42000 },
    { month: 'Apr', revenue: 39000 },
    { month: 'May', revenue: 45000 },
    { month: 'Jun', revenue: monthlyRevenue },
  ];

  const occupancyData = [
    { name: 'Occupied', value: occupiedApartments },
    { name: 'Vacant', value: totalApartments - occupiedApartments },
  ];

  const buildingData = [
    { name: 'Sunset Apts', occupancy: 75 },
    { name: 'Oakwood', occupancy: 85 },
    { name: 'Maple Grove', occupancy: 90 },
  ];

  return {
    stats: [
      { title: 'Total Apartments', value: totalApartments.toString(), change: '+12%', trend: 'up' },
      { title: 'Active Tenants', value: activeTenants.toString(), change: '+8%', trend: 'up' },
      { title: 'Maintenance Requests', value: openMaintenance.toString(), change: '-5%', trend: 'down' },
      { title: 'Monthly Revenue', value: `$${monthlyRevenue.toLocaleString()}`, change: '+15%', trend: 'up' },
    ],
    charts: {
      revenueData,
      occupancyData,
      buildingData,
    },
    lists: {
      recentActivity,
      upcomingExpirations,
    },
    occupancyRate,
    isLoading: !apartmentsData || !tenantsData || !maintenanceData || !invoicesData,
  };
};

export const useAdminDashboard = () => {
  const apartmentsQuery = useQuery({
    queryKey: ['adminApartments'],
    queryFn: () => apartmentService.getAll({ limit: 100 }),
  });

  const tenantsQuery = useQuery({
    queryKey: ['adminTenants'],
    queryFn: () => tenantService.getAll({ limit: 100 }),
  });

  const maintenanceQuery = useQuery({
    queryKey: ['adminMaintenance'],
    queryFn: () => maintenanceService.getAll({ limit: 100 }),
  });

  const invoicesQuery = useQuery({
    queryKey: ['adminInvoices'],
    queryFn: () => Promise.resolve(mockInvoices), // Replace with billingService
  });

  const data = computeAdminStats(
    apartmentsQuery.data,
    tenantsQuery.data,
    maintenanceQuery.data,
    invoicesQuery.data
  );

  return {
    ...data,
    refetch: () => {
      apartmentsQuery.refetch();
      tenantsQuery.refetch();
      maintenanceQuery.refetch();
      invoicesQuery.refetch();
    },
  };
};

