import { CURRENCIES, CURRENCY_SYMBOLS } from './constants';

/**
 * Formats a price with currency symbol
 * @param {number} price - The price to format
 * @param {string} currency - The currency code (default: USD)
 * @param {boolean} showSymbol - Whether to show the currency symbol
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price, currency = CURRENCIES.USD, showSymbol = true) => {
  if (price === null || price === undefined || isNaN(price)) {
    return showSymbol ? `${CURRENCY_SYMBOLS[currency]}0.00` : '0.00';
  }

  const formattedPrice = Number(price).toFixed(2);
  return showSymbol ? `${CURRENCY_SYMBOLS[currency]}${formattedPrice}` : formattedPrice;
};

/**
 * Formats a number with thousands separators
 * @param {number} number - The number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted number string
 */
export const formatNumber = (number, decimals = 0) => {
  if (number === null || number === undefined || isNaN(number)) {
    return '0';
  }

  return Number(number).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Formats a percentage
 * @param {number} value - The value to format as percentage
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted percentage string
 */
export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0%';
  }

  return `${Number(value).toFixed(decimals)}%`;
};

/**
 * Formats a date to a readable string
 * @param {Date|string} date - The date to format
 * @param {string} format - The format type ('short', 'medium', 'long', 'time')
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, format = 'medium') => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const now = new Date();
  const diffMs = now - dateObj;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  // Return relative time for recent dates
  if (diffMinutes < 1) {
    return 'Just now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  }

  // Format based on specified format
  const options = {
    short: { month: 'numeric', day: 'numeric', year: '2-digit' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' },
    time: { hour: 'numeric', minute: '2-digit', hour12: true },
    datetime: { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }
  };

  return dateObj.toLocaleDateString('en-US', options[format] || options.medium);
};

/**
 * Formats a relative time (e.g., "2 hours ago")
 * @param {Date|string} date - The date to format
 * @returns {string} - Formatted relative time string
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const now = new Date();
  const diffMs = now - dateObj;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 30) {
    return 'Just now';
  } else if (diffSeconds < 60) {
    return `${diffSeconds} seconds ago`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`;
  } else if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;
  } else {
    return `${diffYears} year${diffYears !== 1 ? 's' : ''} ago`;
  }
};

/**
 * Formats a duration in milliseconds to a readable string
 * @param {number} ms - Duration in milliseconds
 * @returns {string} - Formatted duration string
 */
export const formatDuration = (ms) => {
  if (!ms || ms < 0) return '0s';

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

/**
 * Formats a name by capitalizing first letters
 * @param {string} name - The name to format
 * @returns {string} - Formatted name
 */
export const formatName = (name) => {
  if (!name || typeof name !== 'string') return '';

  return name
    .trim()
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Formats a phone number
 * @param {string} phone - The phone number to format
 * @returns {string} - Formatted phone number
 */
export const formatPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return '';

  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  return phone; // Return original if format is not recognized
};

/**
 * Formats a quantity with unit
 * @param {number} quantity - The quantity
 * @param {string} unit - The unit of measurement
 * @returns {string} - Formatted quantity string
 */
export const formatQuantity = (quantity, unit = '') => {
  if (quantity === null || quantity === undefined || isNaN(quantity)) {
    return unit ? `0 ${unit}` : '0';
  }

  const formattedQuantity = quantity % 1 === 0 ? quantity.toString() : quantity.toFixed(2);
  return unit ? `${formattedQuantity} ${unit}` : formattedQuantity;
};

/**
 * Formats a file size in bytes to a readable string
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted file size string
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (!bytes || bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

/**
 * Truncates text to a specified length with ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @param {string} suffix - Suffix to add when truncated
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 50, suffix = '...') => {
  if (!text || typeof text !== 'string') return '';

  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Formats a list of items into a readable string
 * @param {Array} items - Array of items
 * @param {number} maxItems - Maximum items to show before truncation
 * @returns {string} - Formatted list string
 */
export const formatList = (items, maxItems = 3) => {
  if (!Array.isArray(items) || items.length === 0) return '';

  if (items.length <= maxItems) {
    if (items.length === 1) return items[0];
    if (items.length === 2) return `${items[0]} and ${items[1]}`;
    return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
  }

  const visible = items.slice(0, maxItems);
  const remaining = items.length - maxItems;
  return `${visible.join(', ')} and ${remaining} more`;
};

/**
 * Formats a budget status message
 * @param {number} spent - Amount spent
 * @param {number} budget - Budget amount
 * @param {string} currency - Currency code
 * @returns {object} - { message: string, status: string, percentage: number }
 */
export const formatBudgetStatus = (spent, budget, currency = CURRENCIES.USD) => {
  if (!budget || budget <= 0) {
    return {
      message: 'No budget set',
      status: 'none',
      percentage: 0
    };
  }

  const percentage = (spent / budget) * 100;
  const remaining = budget - spent;
  
  let status = 'good';
  let message = '';

  if (percentage >= 100) {
    status = 'over';
    message = `Over budget by ${formatPrice(Math.abs(remaining), currency)}`;
  } else if (percentage >= 90) {
    status = 'warning';
    message = `${formatPrice(remaining, currency)} remaining`;
  } else if (percentage >= 75) {
    status = 'caution';
    message = `${formatPrice(remaining, currency)} remaining`;
  } else {
    status = 'good';
    message = `${formatPrice(remaining, currency)} remaining`;
  }

  return {
    message,
    status,
    percentage: Math.round(percentage)
  };
};

/**
 * Formats a shopping list summary
 * @param {Array} items - Array of list items
 * @returns {object} - Summary object with totals and stats
 */
export const formatListSummary = (items) => {
  if (!Array.isArray(items)) {
    return {
      totalItems: 0,
      completedItems: 0,
      pendingItems: 0,
      totalValue: 0,
      formattedTotal: formatPrice(0),
      completionPercentage: 0
    };
  }

  const totalItems = items.length;
  const completedItems = items.filter(item => item.completed).length;
  const pendingItems = totalItems - completedItems;
  const totalValue = items.reduce((sum, item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 1;
    return sum + (price * quantity);
  }, 0);

  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return {
    totalItems,
    completedItems,
    pendingItems,
    totalValue,
    formattedTotal: formatPrice(totalValue),
    completionPercentage
  };
};

/**
 * Formats initials from a name
 * @param {string} name - The full name
 * @param {number} maxInitials - Maximum number of initials
 * @returns {string} - Formatted initials
 */
export const formatInitials = (name, maxInitials = 2) => {
  if (!name || typeof name !== 'string') return '';

  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, maxInitials)
    .map(word => word.charAt(0).toUpperCase())
    .join('');

  return initials;
};

/**
 * Formats a search query for display
 * @param {string} query - The search query
 * @param {number} maxLength - Maximum length for display
 * @returns {string} - Formatted search query
 */
export const formatSearchQuery = (query, maxLength = 30) => {
  if (!query || typeof query !== 'string') return '';

  const trimmed = query.trim();
  if (trimmed.length <= maxLength) return trimmed;

  return `${trimmed.substring(0, maxLength - 3)}...`;
};

/**
 * Formats error messages for user display
 * @param {Error|string} error - The error object or message
 * @returns {string} - User-friendly error message
 */
export const formatErrorMessage = (error) => {
  if (!error) return 'An unknown error occurred';

  if (typeof error === 'string') return error;

  if (error.message) {
    // Handle common error patterns
    if (error.message.includes('Network Error')) {
      return 'Network connection error. Please check your internet connection.';
    }
    if (error.message.includes('timeout')) {
      return 'Request timed out. Please try again.';
    }
    if (error.message.includes('401')) {
      return 'Authentication failed. Please log in again.';
    }
    if (error.message.includes('403')) {
      return 'You do not have permission to perform this action.';
    }
    if (error.message.includes('404')) {
      return 'The requested resource was not found.';
    }
    if (error.message.includes('500')) {
      return 'Server error. Please try again later.';
    }

    return error.message;
  }

  return 'An unexpected error occurred';
};