import api from './api';

const extractErrorMessage = (error) => {
  console.log(error)
  return error.response?.data?.message || 'An error occurred. Please try again later.';
};

export const checkIdentifier = async (identifier) => {
  try {
    const response = await api.post('/api/v1/auth/check-identifier', { identifier });
    return response.data;
  } catch (error) {

    throw extractErrorMessage(error);
  }
};

export const loginAPI = async (identifier, password) => {
  try {
    const response = await api.post('/api/v1/auth/login', { identifier, password });
    return response.data.data; // Extracts `token` and `user` out of the nested `data` envelope
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const signupAPI = async (name, identifier, password, dob, gender) => {
  try {
    const response = await api.post('/api/v1/auth/register', { name, identifier, password, dob, gender });
    return response.data;
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const verifyOtpAPI = async (identifier, otp) => {
  try {
    const response = await api.post('/api/v1/auth/verify-otp', { identifier, otp });
    return response.data.data; // Returns payload containing token/user bindings
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const forgotPasswordAPI = async (identifier) => {
  try {
    const response = await api.post('/api/v1/auth/forgot-password', { identifier });
    return response.data;
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const resetPasswordAPI = async (identifier, otp, newPassword) => {
  try {
    const response = await api.post('/api/v1/auth/reset-password', { identifier, otp, newPassword });
    return response.data;
  } catch (error) {
    throw extractErrorMessage(error);
  }
};

export const resendOtpAPI = async (identifier) => {
  try {
    const response = await api.post('/api/v1/auth/resend-otp', { identifier });
    return response.data;
  } catch (error) {
    throw extractErrorMessage(error);
  }
};
