import api from '../utils/api.js';

export function useProducts() {
  const createProduct = async (formData) => {
    // Let axios set the Content-Type (including boundary) for FormData
    const { data } = await api.post('/products', formData);
    return data;
  };

  const getMyProducts = async () => {
    const { data } = await api.get('/products/mine');
    return data;
  };

  const getAdminProducts = async (filters = {}) => {
    const params = { ...filters };
    const { data } = await api.get('/products', { params });
    return data;
  };

  const updateProductStatus = async (id, status) => {
    const { data } = await api.put(`/products/${id}/status`, { status });
    return data;
  };

  return { createProduct, getMyProducts, getAdminProducts, updateProductStatus };
}
