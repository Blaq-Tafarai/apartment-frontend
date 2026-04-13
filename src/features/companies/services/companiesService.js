import { mockCompanies } from '../mocks/companies.mock';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const companiesService = {
  // Get all companies with optional filtering
  async getAll(params = {}) {
    await delay();
    let companies = [...mockCompanies];

    // Apply search filter
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      companies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm) ||
        company.email.toLowerCase().includes(searchTerm) ||
        company.adminUser?.name.toLowerCase().includes(searchTerm)
      );
    }

    // Apply status filter
    if (params.status) {
      companies = companies.filter(company => company.status === params.status);
    }

    // Apply pagination
    const page = params.page || 1;
    const limit = params.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCompanies = companies.slice(startIndex, endIndex);

    return {
      data: paginatedCompanies,
      total: companies.length,
      totalPages: Math.ceil(companies.length / limit),
      currentPage: page,
    };
  },

  // Get company by ID
  async getById(id) {
    await delay();
    const company = mockCompanies.find(c => c.id === parseInt(id));
    if (!company) {
      throw new Error('Company not found');
    }
    return company;
  },

  // Create new company
  async create(companyData) {
    await delay();
    const newCompany = {
      id: Math.max(...mockCompanies.map(c => c.id)) + 1,
      ...companyData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockCompanies.push(newCompany);
    return newCompany;
  },

  // Update company
  async update(id, data) {
    await delay();
    const index = mockCompanies.findIndex(c => c.id === parseInt(id));
    if (index === -1) {
      throw new Error('Company not found');
    }
    mockCompanies[index] = {
      ...mockCompanies[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockCompanies[index];
  },

  // Delete company
  async delete(id) {
    await delay();
    const index = mockCompanies.findIndex(c => c.id === parseInt(id));
    if (index === -1) {
      throw new Error('Company not found');
    }
    const deletedCompany = mockCompanies.splice(index, 1)[0];
    return deletedCompany;
  },

  // Get company statistics
  async getStats(companyId) {
    await delay();
    const company = mockCompanies.find(c => c.id === parseInt(companyId));
    if (!company) {
      throw new Error('Company not found');
    }
    return company.stats || {};
  },
};
