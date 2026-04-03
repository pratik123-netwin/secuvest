import api from './api';

const extractErrorMessage = (error) => {
  return error.response?.data?.message || 'An error occurred. Please try again.';
};

export const getProducts = async (params = {}) => {
  try {
    const response = await api.get('/api/v1/products', { params });
    const data = response.data.data.data;
    return Array.isArray(data) ? data : (data?.rows || []);
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const getProductCategories = async () => {
  try {
    const response = await api.get('/api/v1/products/categories');
    const data = response.data.data;
    return Array.isArray(data) ? data : (data?.rows || []);
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const getProductSuppliers = async () => {
  try {
    const response = await api.get('/api/v1/products/suppliers');
    const data = response.data.data;
    return Array.isArray(data) ? data : (data?.rows || []);
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/api/v1/products/${productId}`);
    return response.data.data;
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const getCombinedProducts = async (productIds, params = {}) => {
  try {
    const response = await api.get('/api/v1/products/combined', {
      params: { product_ids: productIds, ...params },
    });
    const data = response.data.data.data;
    return Array.isArray(data) ? data : (data?.rows || []);
  } catch (error) {
    throw extractErrorMessage(error);
  }
};


// Legacy aliases kept for backward-compatibility with any other screens
export const getProducts_legacy = getProducts;
export const getCategories = getProductCategories;
export const getSupplierNames = getProductSuppliers;
export const getProductById_legacy = getProductById;
