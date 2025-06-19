import { VALIDATION_RULES } from './constants';

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: 'Email is required' };
  }

  const trimmedEmail = email.trim();
  
  if (trimmedEmail.length === 0) {
    return { isValid: false, message: 'Email is required' };
  }

  if (!VALIDATION_RULES.email.pattern.test(trimmedEmail)) {
    return { isValid: false, message: VALIDATION_RULES.email.message };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates a password
 * @param {string} password - The password to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: 'Password is required' };
  }

  if (password.length < VALIDATION_RULES.password.minLength) {
    return { 
      isValid: false, 
      message: `Password must be at least ${VALIDATION_RULES.password.minLength} characters long` 
    };
  }

  if (!VALIDATION_RULES.password.pattern.test(password)) {
    return { isValid: false, message: VALIDATION_RULES.password.message };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates password confirmation
 * @param {string} password - The original password
 * @param {string} confirmPassword - The confirmation password
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (!confirmPassword || typeof confirmPassword !== 'string') {
    return { isValid: false, message: 'Password confirmation is required' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates a name (first name, last name, etc.)
 * @param {string} name - The name to validate
 * @param {string} fieldName - The field name for error messages
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validateName = (name, fieldName = 'Name') => {
  if (!name || typeof name !== 'string') {
    return { isValid: false, message: `${fieldName} is required` };
  }

  const trimmedName = name.trim();

  if (trimmedName.length < VALIDATION_RULES.name.minLength) {
    return { 
      isValid: false, 
      message: `${fieldName} must be at least ${VALIDATION_RULES.name.minLength} characters long` 
    };
  }

  if (trimmedName.length > VALIDATION_RULES.name.maxLength) {
    return { 
      isValid: false, 
      message: `${fieldName} must be no more than ${VALIDATION_RULES.name.maxLength} characters long` 
    };
  }

  if (!VALIDATION_RULES.name.pattern.test(trimmedName)) {
    return { isValid: false, message: VALIDATION_RULES.name.message };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates a list name
 * @param {string} listName - The list name to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validateListName = (listName) => {
  if (!listName || typeof listName !== 'string') {
    return { isValid: false, message: 'List name is required' };
  }

  const trimmedName = listName.trim();

  if (trimmedName.length < VALIDATION_RULES.listName.minLength) {
    return { isValid: false, message: 'List name cannot be empty' };
  }

  if (trimmedName.length > VALIDATION_RULES.listName.maxLength) {
    return { 
      isValid: false, 
      message: `List name must be no more than ${VALIDATION_RULES.listName.maxLength} characters long` 
    };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates an item name
 * @param {string} itemName - The item name to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validateItemName = (itemName) => {
  if (!itemName || typeof itemName !== 'string') {
    return { isValid: false, message: 'Item name is required' };
  }

  const trimmedName = itemName.trim();

  if (trimmedName.length < VALIDATION_RULES.itemName.minLength) {
    return { isValid: false, message: 'Item name cannot be empty' };
  }

  if (trimmedName.length > VALIDATION_RULES.itemName.maxLength) {
    return { 
      isValid: false, 
      message: `Item name must be no more than ${VALIDATION_RULES.itemName.maxLength} characters long` 
    };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates a price
 * @param {string|number} price - The price to validate
 * @returns {object} - { isValid: boolean, message: string, value: number }
 */
export const validatePrice = (price) => {
  if (price === '' || price === null || price === undefined) {
    return { isValid: true, message: '', value: 0 }; // Price is optional
  }

  const priceString = String(price);
  const priceNumber = parseFloat(priceString);

  if (isNaN(priceNumber)) {
    return { isValid: false, message: 'Please enter a valid price', value: 0 };
  }

  if (priceNumber < VALIDATION_RULES.price.min) {
    return { isValid: false, message: 'Price cannot be negative', value: 0 };
  }

  if (priceNumber > VALIDATION_RULES.price.max) {
    return { 
      isValid: false, 
      message: `Price cannot exceed ${VALIDATION_RULES.price.max}`, 
      value: 0 
    };
  }

  if (!VALIDATION_RULES.price.pattern.test(priceString)) {
    return { isValid: false, message: 'Price can have at most 2 decimal places', value: 0 };
  }

  return { isValid: true, message: '', value: priceNumber };
};

/**
 * Validates a quantity
 * @param {string|number} quantity - The quantity to validate
 * @returns {object} - { isValid: boolean, message: string, value: number }
 */
export const validateQuantity = (quantity) => {
  if (quantity === '' || quantity === null || quantity === undefined) {
    return { isValid: true, message: '', value: 1 }; // Default quantity is 1
  }

  const quantityString = String(quantity);
  const quantityNumber = parseFloat(quantityString);

  if (isNaN(quantityNumber)) {
    return { isValid: false, message: 'Please enter a valid quantity', value: 1 };
  }

  if (quantityNumber < VALIDATION_RULES.quantity.min) {
    return { isValid: false, message: 'Quantity must be greater than 0', value: 1 };
  }

  if (quantityNumber > VALIDATION_RULES.quantity.max) {
    return { 
      isValid: false, 
      message: `Quantity cannot exceed ${VALIDATION_RULES.quantity.max}`, 
      value: 1 
    };
  }

  if (!VALIDATION_RULES.quantity.pattern.test(quantityString)) {
    return { isValid: false, message: 'Quantity can have at most 2 decimal places', value: 1 };
  }

  return { isValid: true, message: '', value: quantityNumber };
};

/**
 * Validates a budget amount
 * @param {string|number} budget - The budget to validate
 * @returns {object} - { isValid: boolean, message: string, value: number }
 */
export const validateBudget = (budget) => {
  if (budget === '' || budget === null || budget === undefined) {
    return { isValid: true, message: '', value: 0 }; // Budget is optional
  }

  const budgetString = String(budget);
  const budgetNumber = parseFloat(budgetString);

  if (isNaN(budgetNumber)) {
    return { isValid: false, message: 'Please enter a valid budget amount', value: 0 };
  }

  if (budgetNumber < 0) {
    return { isValid: false, message: 'Budget cannot be negative', value: 0 };
  }

  if (budgetNumber > 999999.99) {
    return { isValid: false, message: 'Budget amount is too large', value: 0 };
  }

  return { isValid: true, message: '', value: budgetNumber };
};

/**
 * Validates a phone number
 * @param {string} phone - The phone number to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
export const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return { isValid: true, message: '' }; // Phone is optional
  }

  const trimmedPhone = phone.trim();
  
  if (trimmedPhone.length === 0) {
    return { isValid: true, message: '' }; // Empty phone is valid (optional)
  }

  // Basic phone validation - allows various formats
  const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
  
  if (!phonePattern.test(trimmedPhone.replace(/[\s\-\(\)]/g, ''))) {
    return { isValid: false, message: 'Please enter a valid phone number' };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates a form with multiple fields
 * @param {object} formData - The form data to validate
 * @param {object} validationRules - The validation rules for each field
 * @returns {object} - { isValid: boolean, errors: object }
 */
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach(field => {
    const value = formData[field];
    const rules = validationRules[field];
    
    if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors[field] = `${rules.label || field} is required`;
      isValid = false;
      return;
    }

    if (value && rules.validator) {
      const validation = rules.validator(value);
      if (!validation.isValid) {
        errors[field] = validation.message;
        isValid = false;
      }
    }
  });

  return { isValid, errors };
};

/**
 * Sanitizes a string by removing potentially harmful characters
 * @param {string} input - The input string to sanitize
 * @returns {string} - The sanitized string
 */
export const sanitizeString = (input) => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

/**
 * Validates and sanitizes user input
 * @param {string} input - The input to validate and sanitize
 * @param {number} maxLength - Maximum allowed length
 * @returns {object} - { isValid: boolean, message: string, value: string }
 */
export const validateAndSanitizeInput = (input, maxLength = 1000) => {
  if (!input || typeof input !== 'string') {
    return { isValid: false, message: 'Input is required', value: '' };
  }

  const sanitized = sanitizeString(input);
  
  if (sanitized.length === 0) {
    return { isValid: false, message: 'Input cannot be empty', value: '' };
  }

  if (sanitized.length > maxLength) {
    return { 
      isValid: false, 
      message: `Input must be no more than ${maxLength} characters`, 
      value: sanitized 
    };
  }

  return { isValid: true, message: '', value: sanitized };
};

/**
 * Checks if a value is empty (null, undefined, empty string, or empty array)
 * @param {any} value - The value to check
 * @returns {boolean} - True if the value is empty
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Creates a debounced validation function
 * @param {function} validator - The validation function
 * @param {number} delay - The debounce delay in milliseconds
 * @returns {function} - The debounced validation function
 */
export const createDebouncedValidator = (validator, delay = 300) => {
  let timeoutId;
  
  return (value, callback) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const result = validator(value);
      callback(result);
    }, delay);
  };
};