import api from './api';

export const loginAPI = async (emailOrPhone, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { token: 'mock-jwt-token-123', user: { name: 'Staff User', email: emailOrPhone } } });
    }, 1000);
  });
};

export const signupAPI = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { token: 'mock-jwt-token-456', user: userData } });
    }, 1000);
  });
};

export const verifyOtpAPI = async (otp) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { success: true } });
    }, 1000);
  });
};

export const forgotPasswordAPI = async (emailOrPhone) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { success: true } });
    }, 1000);
  });
};
