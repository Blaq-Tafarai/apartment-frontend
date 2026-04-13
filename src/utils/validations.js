// Validation rules
export const required = (value) => {
  if (!value || value.toString().trim() === '') {
    return 'This field is required';
  }
  return null;
};

export const email = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const minLength = (min) => (value) => {
  if (value.length < min) {
    return `Minimum length is ${min} characters`;
  }
  return null;
};

export const maxLength = (max) => (value) => {
  if (value.length > max) {
    return `Maximum length is ${max} characters`;
  }
  return null;
};

export const numeric = (value) => {
  if (isNaN(value)) {
    return 'Please enter a valid number';
  }
  return null;
};

export const phone = (value) => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!phoneRegex.test(value)) {
    return 'Please enter a valid phone number';
  }
  return null;
};

export const password = (value) => {
  if (value.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[A-Z]/.test(value)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[a-z]/.test(value)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/[0-9]/.test(value)) {
    return 'Password must contain at least one number';
  }
  return null;
};

export const match = (fieldName) => (value, formData) => {
  if (value !== formData[fieldName]) {
    return `Must match ${fieldName}`;
  }
  return null;
};

// Validate form with multiple rules
export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field];
    const value = formData[field];

    for (let i = 0; i < fieldRules.length; i++) {
      const error = fieldRules[i](value, formData);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
