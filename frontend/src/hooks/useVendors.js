import api from '../utils/api.js';

export function useVendors() {
  const listVendors = async () => {
    const { data } = await api.get('/admin/vendors');
    return data;
  };

  const updateVendorStatus = async (id, status) => {
    const { data } = await api.put(`/admin/vendors/${id}/status`, { status });
    return data;
  };

  const listCategories = async () => {
    // Public categories endpoint (no admin role required)
    const { data } = await api.get('/categories');
    return data;
  };

  const createCategory = async (name, description) => {
    const { data } = await api.post('/admin/categories', { name, description });
    return data;
  };

  return { listVendors, updateVendorStatus, listCategories, createCategory };
}
