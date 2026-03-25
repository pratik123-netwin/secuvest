export const validateEmailOrPhone = (value) => {
  if (!value) return 'Email or Phone is required';
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhone = /^\+?[\d\s-]{10,15}$/.test(value);
  if (!isEmail && !isPhone) return 'Enter a valid email address or phone number';
  return null;
};

export const validatePassword = (value) => {
  if (!value) return 'Password is required';
  if (value.length < 6) return 'Password must be at least 6 characters';
  return null;
};

export const validateName = (value) => {
  if (!value || value.trim().length === 0) return 'Name is required';
  return null;
};
