import { useQuery } from '@tanstack/react-query';
import { apartmentService } from '../../apartment/services/apartmentService';
import { maintenanceService } from '../../maintenance/services/maintenanceService';
import { mockInvoices } from '../../billing/mocks/invoices.mock';
import { apartments } from '../../apartment/mocks/apartments.mock';
import { mockMaintenance as maintenanceRequests } from '../../maintenance/mocks/maintenance.mock';

// Tenant dashboard - personal view (mock user apartment ID 1)
const computeTenantStats = (apartmentsData, maintenanceData, invoicesData) => {
  const apartmentsList = apartmentsData?.data || apartments;
  const maintenanceList = maintenanceData?.data || maintenanceRequests;
  const invoicesList = invoicesData || mockInvoices;

  // Mock tenant apartment (first occupied)
  const myApartment = apartmentsList.find(a => a.status === 'Occupied') || apartmentsList[0];
  const myMaintenance = maintenanceList.filter(m => m.apartmentId === myApartment?.id);
  const myInvoices = invoicesList.filter(i => i.tenant === myApartment?.tenant?.name || i.tenant.includes('John')).slice(0, 4);

  const openRequests = myMaintenance.filter(m => m.status === 'OPEN' || m.status === 'IN_PROGRESS').length;
  const rentDue = myInvoices.find(i => i.status !== 'Paid')?.amount || 1250;
  const leaseEnd = 'Dec 2024'; // Mock

  const maintenanceRequests = myMaintenance.slice(0, 2).map(m => ({
    id: m.id,
    issue: m.issue,
    date: new Date(m.completedAt || Date.now()).toLocaleDateString(),
    status: m.status,
    priority: m.priority
  }));

  const paymentHistory = myInvoices.map(i => ({
    id: i.id,
    date: new Date(i.issueDate).toLocaleDateString(),
    amount: i.amount,
    status: i.status
  }));

  const documents = [
    { id: 1, name: 'Lease Agreement', type: 'PDF', date: 'Jan 1, 2024' },
    { id: 2, name: 'Rent Receipt - May', type: 'PDF', date: 'May 1, 2024' },
    { id: 3, name: 'Move-in Checklist', type: 'PDF', date: 'Jan 1, 2024' },
  ];

  return {
    stats: [
      { title: 'Apartment', value: myApartment?.unit || 'Apt 205', change: '', trend: '' },
      { title: 'Rent Due', value: `$${rentDue.toLocaleString()}`, change: 'Due in 5 days', trend: 'neutral' },
      { title: 'Open Requests', value: openRequests.toString(), change: 'In Progress', trend: 'neutral' },
      { title: 'Lease Ends', value: leaseEnd, change: '6 months', trend: 'neutral' },
    ],
    lists: {
      paymentHistory,
      maintenanceRequests,
      documents,
      myApartment
    },
    isLoading: !apartmentsData || !maintenanceData || !invoicesData,
  };
};

export const useTenantDashboard = () => {
  const apartmentQuery = useQuery({
    queryKey: ['tenantApartment'],
    queryFn: () => apartmentService.getAll({ limit: 10 }),
  });

  const maintenanceQuery = useQuery({
    queryKey: ['tenantMaintenance'],
    queryFn: () => maintenanceService.getAll({ limit: 20 }),
  });

  const invoicesQuery = useQuery({
    queryKey: ['tenantInvoices'],
    queryFn: () => Promise.resolve(mockInvoices),
  });

  const data = computeTenantStats(
    apartmentQuery.data,
    maintenanceQuery.data,
    invoicesQuery.data
  );

  return {
    ...data,
    refetch: () => {
      apartmentQuery.refetch();
      maintenanceQuery.refetch();
      invoicesQuery.refetch();
    },
  };
};

