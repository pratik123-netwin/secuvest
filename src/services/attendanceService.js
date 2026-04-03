import api from './api';

const extractErrorMessage = (error) => {
  return error.response?.data?.message || 'An error occurred. Please try again later.';
};

export const getStores = async (params = {}) => {
  try {
    const response = await api.get('/api/v1/attendance/stores', { params });
    return response.data.data;
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const getStoreDetails = async (storeId) => {
  try {
    const response = await api.get(`/api/v1/attendance/stores/${storeId}`);
    return response.data.data;
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const getRetailers = async () => {
  try {
    const response = await api.get('/api/v1/attendance/retailers');
    return response.data.data;
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const getRegions = async () => {
  try {
    const response = await api.get('/api/v1/attendance/regions');
    return response.data.data;
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const logLocationCheck = async (store_id, latitude, longitude, distance_meters, result) => {
  try {
    const response = await api.post('/api/v1/attendance/location/log', {
      store_id,
      latitude,
      longitude,
      distance_meters,
      result
    });
    return response.data;
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const clockIn = async (store_id, latitude, longitude, clock_in_type) => {
  try {
    const response = await api.post('/api/v1/attendance/clock-in', {
      store_id,
      latitude,
      longitude,
      clock_in_type
    });
    return response.data.data;
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const clockOut = async (session_id, latitude, longitude) => {
  try {
    const response = await api.post('/api/v1/attendance/clock-out', {
      session_id,
      latitude,
      longitude
    });
    return response.data.data;
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const getActiveSession = async () => {
  try {
    const response = await api.get('/api/v1/attendance/active-session');
    return response.data.data; // null or object
  } catch (error) {
    throw extractErrorMessage(error);
  }
};
