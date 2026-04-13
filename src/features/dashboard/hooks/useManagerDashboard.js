import { useQuery } from '@tanstack/react-query';
import { apartmentService } from '../../apartment/services/apartmentService';
import { tenantService } from '../../tenants/services/tenantService';
import { maintenanceService } from '../../maintenance/services/maintenanceService';
import { mockInvoices } from '../../billing/mocks/invoices.mock';
import { apartments } from '../../apartment/mocks/apartments.mock';
import { mockTenants as tenants } from '../../tenants/mocks/tenants.mock';
import { mockMaintenance as maintenanceRequests } from '../../maintenance/mocks/maintenance.mock';

// Manager dashboard - portfolio view (filter by manager's buildings)
const computeManagerStats = (apartmentsData, tenantsData, maintenanceData, invoicesData) => {
  const apartmentsList = apartmentsData?.data || apartments;
  const tenantsList = tenantsData?.data || tenants;
  const maintenanceList = maintenanceData?.data || maintenanceRequests;
  const invoicesList = invoicesData || mockInvoices;

  // Filter manager's portfolio (mock: buildingId 1 & 2)
  const managerBuildings = ['1', '2'];
  const portfolioApartments = apartmentsList.filter(a => managerBuildings.includes(a.buildingId));
  const portfolioTenants = tenantsList.filter(t => managerBuildings.includes(t.buildingId));
  const portfolioMaintenance = maintenanceList.filter(m => managerBuildings.includes(m.buildingId));

  const totalMyApartments = portfolioApartments.length;
  const activeMyTenants = portfolioTenants.filter(t => t.status === 'Active').length;
  const openRequests = portfolioMaintenance.filter(m => m.status === 'OPEN' || m.status === 'IN_PROGRESS').length;
  const thisMonthRevenue = invoicesList
    .filter(i => i.status === 'Paid' && new Date(i.issueDate).getMonth() === new Date().getMonth())
    .reduce((sum, i) => sum + i.amount, 0);

  // My Apartments list (top 4)
  const myApartments = portfolioApartments.slice(0, 4).map(a => ({
    number: a.unit,
    tenant: a.tenant?.name || 'Vacant',
    status: a.status,
    rent: `$${a.rent?.toLocaleString() || 0}`
  }));

  // Recent Maintenance
  const recentMaintenance = portfolioMaintenance.slice(0, 3).map(m => ({
    id: m.id,
    unit: m.apartment?.number,
    issue: m.issue,
    status: m.status,
    priority: m.priority
  }));

  // Chart data
  const revenueData = [
    { month: 'Jan', revenue: 10500 },
    { month: 'Feb', revenue: 11200 },
    { month: 'Mar', revenue: 10800 },
    { month: 'Apr', revenue: 11500 },
    { month: 'May', revenue: 12000 },
    { month: 'Jun', revenue: thisMonthRevenue },
  ];

  const maintenanceByType = [
    { name: 'Plumbing', value: 3 },
    { name: 'Electrical', value: 2 },
    { name: 'HVAC', value: 4 },
    { name: 'Appliances', value: 1 },
  ];

  return {
    stats: [
      { title: 'My Apartments', value: totalMyApartments.toString(), change: '+3', trend: 'up' },
      { title: 'Active Tenants', value: activeMyTenants.toString(), change: '+2', trend: 'up' },
      { title: 'Open Requests', value: openRequests.toString(), change: '-2', trend: 'down' },
      { title: 'This Month', value: `$${thisMonthRevenue.toLocaleString()}`, change: '+8%', trend: 'up' },
    ],
    charts: {
      revenueData,
      maintenanceByType,
    },
    lists: {
      myApartments,
      recentMaintenance,
    },
    isLoading: !apartmentsData || !tenantsData || !maintenanceData || !invoicesData,
  };
};

export const useManagerDashboard = () => {
  const apartmentsQuery = useQuery({
    queryKey: ['managerApartments'],
    queryFn: () => apartmentService.getAll({ limit: 50 }),
  });

  const tenantsQuery = useQuery({
    queryKey: ['managerTenants'],
    queryFn: () => tenantService.getAll({ limit: 50 }),
  });

  const maintenanceQuery = useQuery({
    queryKey: ['managerMaintenance'],
    queryFn: () => maintenanceService.getAll({ limit: 50 }),
  });

  const invoicesQuery = useQuery({
    queryKey: ['managerInvoices'],
    queryFn: () => Promise.resolve(mockInvoices),
  });

  const data = computeManagerStats(
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

