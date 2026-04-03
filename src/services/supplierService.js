import api from './api';

const extractErrorMessage = (error) => {
  return error.response?.data?.message || 'An error occurred. Please try again later.';
};

export const getSuppliers = async (params = {}) => {
  try {
    const response = await api.get('/api/v1/suppliers', { params });
    return response.data.data.data;
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const getSupplierDetails = async (id) => {
  try {
    const response = await api.get(`/api/v1/suppliers/${id}`);
    return response.data.data;
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const getSupplierMetrics = async (id) => {
  try {
    const response = await api.get(`/api/v1/suppliers/${id}/metrics`);
    return response.data.data;
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const getSupplierProducts = async (id, params = {}) => {
  try {
    const response = await api.get(`/api/v1/suppliers/${id}/products`, { params });
    return response.data.data.data;
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const getCombinedProducts = async (supplierIds, params = {}) => {
  try {
    const response = await api.get('/api/v1/suppliers/products/combined', {
      params: { supplier_ids: supplierIds, ...params }
    });
    return response.data.data.data;
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const getMetricsDrilldown = async (id, params = {}) => {
  try {
    const response = await api.get(`/api/v1/suppliers/${id}/metrics/drilldown`, { params });
    return response.data.data;
  } catch (error) {
    throw extractErrorMessage(error);
  }
};
