// App configuration
export const APP_CONFIG = {
    name: 'GroceryBuddy',
    version: '1.0.0',
    description: 'Your smart grocery list and budget companion',
  };
  
  // API endpoints
  export const API_ENDPOINTS = {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      forgotPassword: '/auth/forgot-password',
      resetPassword: '/auth/reset-password',
    },
    lists: {
      getAll: '/lists',
      create: '/lists',
      update: '/lists/:id',
      delete: '/lists/:id',
      share: '/lists/:id/share',
      unshare: '/lists/:id/unshare',
    },
    items: {
      getAll: '/items',
      create: '/items',
      update: '/items/:id',
      delete: '/items/:id',
      toggle: '/items/:id/toggle',
    },
    user: {
      profile: '/user/profile',
      updateProfile: '/user/profile',
      deleteAccount: '/user/delete',
      subscription: '/user/subscription',
    },
  };
  
  // Storage keys
export const STORAGE_KEYS = {
  // Auth
  ACCESS_TOKEN: '@grocery_buddy_access_token',
  REFRESH_TOKEN: '@grocery_buddy_refresh_token',
  USER_DATA: '@grocery_buddy_user_data',
  BIOMETRIC_ENABLED: '@grocery_buddy_biometric_enabled',
  
  // App state
  THEME_PREFERENCE: '@grocery_buddy_theme',
  LANGUAGE_PREFERENCE: '@grocery_buddy_language',
  ONBOARDING_COMPLETED: '@grocery_buddy_onboarding_completed',
  NOTIFICATIONS_ENABLED: '@grocery_buddy_notifications',
  
  // Lists and items
  LISTS: '@grocery_buddy_lists',
  OFFLINE_LISTS: '@grocery_buddy_offline_lists',
  DRAFT_LISTS: '@grocery_buddy_draft_lists',
  RECENT_ITEMS: '@grocery_buddy_recent_items',
  FAVORITE_ITEMS: '@grocery_buddy_favorite_items',
    
    // Settings
    CURRENCY_PREFERENCE: '@grocery_buddy_currency',
    BUDGET_ALERTS: '@grocery_buddy_budget_alerts',
    PRICE_TRACKING: '@grocery_buddy_price_tracking',
  };
  
  // User roles and permissions
  export const USER_ROLES = {
    FREE: 'free',
    PREMIUM: 'premium',
    FAMILY: 'family',
  };
  
  export const PERMISSIONS = {
    [USER_ROLES.FREE]: {
      maxLists: 3,
      maxItemsPerList: 50,
      sharing: false,
      budgetTracking: true,
      priceHistory: false,
      advancedReports: false,
    },
    [USER_ROLES.PREMIUM]: {
      maxLists: 20,
      maxItemsPerList: 200,
      sharing: true,
      budgetTracking: true,
      priceHistory: true,
      advancedReports: true,
    },
    [USER_ROLES.FAMILY]: {
      maxLists: -1, // unlimited
      maxItemsPerList: -1, // unlimited
      sharing: true,
      budgetTracking: true,
      priceHistory: true,
      advancedReports: true,
      familyAccounts: 6,
    },
  };
  
  // List types and categories
  export const LIST_TYPES = {
    GROCERY: 'grocery',
    SHOPPING: 'shopping',
    MEAL_PLAN: 'meal_plan',
    RECIPE: 'recipe',
    CUSTOM: 'custom',
  };
  
  export const ITEM_CATEGORIES = {
    PRODUCE: 'produce',
    DAIRY: 'dairy',
    MEAT: 'meat',
    SEAFOOD: 'seafood',
    BAKERY: 'bakery',
    PANTRY: 'pantry',
    FROZEN: 'frozen',
    BEVERAGES: 'beverages',
    SNACKS: 'snacks',
    HEALTH: 'health',
    HOUSEHOLD: 'household',
    PERSONAL_CARE: 'personal_care',
    OTHER: 'other',
  };
  
  export const CATEGORY_LABELS = {
    [ITEM_CATEGORIES.PRODUCE]: 'Produce',
    [ITEM_CATEGORIES.DAIRY]: 'Dairy & Eggs',
    [ITEM_CATEGORIES.MEAT]: 'Meat & Poultry',
    [ITEM_CATEGORIES.SEAFOOD]: 'Seafood',
    [ITEM_CATEGORIES.BAKERY]: 'Bakery',
    [ITEM_CATEGORIES.PANTRY]: 'Pantry & Canned',
    [ITEM_CATEGORIES.FROZEN]: 'Frozen Foods',
    [ITEM_CATEGORIES.BEVERAGES]: 'Beverages',
    [ITEM_CATEGORIES.SNACKS]: 'Snacks & Candy',
    [ITEM_CATEGORIES.HEALTH]: 'Health & Wellness',
    [ITEM_CATEGORIES.HOUSEHOLD]: 'Household Items',
    [ITEM_CATEGORIES.PERSONAL_CARE]: 'Personal Care',
    [ITEM_CATEGORIES.OTHER]: 'Other',
  };
  
  // Priority levels
  export const PRIORITY_LEVELS = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
  };
  
  export const PRIORITY_LABELS = {
    [PRIORITY_LEVELS.LOW]: 'Low',
    [PRIORITY_LEVELS.MEDIUM]: 'Medium',
    [PRIORITY_LEVELS.HIGH]: 'High',
    [PRIORITY_LEVELS.URGENT]: 'Urgent',
  };
  
  // Units of measurement
  export const UNITS = {
    // Weight
    KG: 'kg',
    LB: 'lb',
    G: 'g',
    OZ: 'oz',
    
    // Volume
    L: 'l',
    ML: 'ml',
    GAL: 'gal',
    QT: 'qt',
    PT: 'pt',
    CUP: 'cup',
    FL_OZ: 'fl_oz',
    
    // Count
    PIECE: 'piece',
    PACK: 'pack',
    BOTTLE: 'bottle',
    CAN: 'can',
    BOX: 'box',
    BAG: 'bag',
    
    // Other
    DOZEN: 'dozen',
    BUNCH: 'bunch',
  };
  
  export const UNIT_LABELS = {
    [UNITS.KG]: 'kg',
    [UNITS.LB]: 'lb',
    [UNITS.G]: 'g',
    [UNITS.OZ]: 'oz',
    [UNITS.L]: 'L',
    [UNITS.ML]: 'ml',
    [UNITS.GAL]: 'gal',
    [UNITS.QT]: 'qt',
    [UNITS.PT]: 'pt',
    [UNITS.CUP]: 'cup',
    [UNITS.FL_OZ]: 'fl oz',
    [UNITS.PIECE]: 'piece',
    [UNITS.PACK]: 'pack',
    [UNITS.BOTTLE]: 'bottle',
    [UNITS.CAN]: 'can',
    [UNITS.BOX]: 'box',
    [UNITS.BAG]: 'bag',
    [UNITS.DOZEN]: 'dozen',
    [UNITS.BUNCH]: 'bunch',
  };
  
  // Currency codes
  export const CURRENCIES = {
    USD: 'USD',
    EUR: 'EUR',
    GBP: 'GBP',
    CAD: 'CAD',
    AUD: 'AUD',
    JPY: 'JPY',
    CNY: 'CNY',
    INR: 'INR',
    BRL: 'BRL',
    MXN: 'MXN',
  };
  
  export const CURRENCY_SYMBOLS = {
    [CURRENCIES.USD]: '$',
    [CURRENCIES.EUR]: '€',
    [CURRENCIES.GBP]: '£',
    [CURRENCIES.CAD]: 'C$',
    [CURRENCIES.AUD]: 'A$',
    [CURRENCIES.JPY]: '¥',
    [CURRENCIES.CNY]: '¥',
    [CURRENCIES.INR]: '₹',
    [CURRENCIES.BRL]: 'R$',
    [CURRENCIES.MXN]: '$',
  };
  
  // Date and time formats
  export const DATE_FORMATS = {
    SHORT: 'MM/DD/YYYY',
    MEDIUM: 'MMM DD, YYYY',
    LONG: 'MMMM DD, YYYY',
    ISO: 'YYYY-MM-DD',
    TIME: 'HH:mm',
    DATETIME: 'MMM DD, YYYY HH:mm',
  };
  
  // Animation durations (in milliseconds)
  export const ANIMATION_DURATION = {
    FAST: 150,
    MEDIUM: 300,
    SLOW: 500,
    EXTRA_SLOW: 1000,
  };
  
  // Network timeouts (in milliseconds)
  export const NETWORK_TIMEOUT = {
    REQUEST: 10000, // 10 seconds
    UPLOAD: 30000, // 30 seconds
    DOWNLOAD: 60000, // 60 seconds
  };
  
  // Validation rules
  export const VALIDATION_RULES = {
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address',
    },
    password: {
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
    },
    name: {
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s]+$/,
      message: 'Name must contain only letters and spaces',
    },
    listName: {
      minLength: 1,
      maxLength: 100,
      message: 'List name must be between 1 and 100 characters',
    },
    itemName: {
      minLength: 1,
      maxLength: 200,
      message: 'Item name must be between 1 and 200 characters',
    },
    price: {
      min: 0,
      max: 99999.99,
      pattern: /^\d+(\.\d{1,2})?$/,
      message: 'Please enter a valid price',
    },
    quantity: {
      min: 0.01,
      max: 9999,
      pattern: /^\d+(\.\d{1,2})?$/,
      message: 'Please enter a valid quantity',
    },
  };
  
  // Error messages
  export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
    UNAUTHORIZED: 'Your session has expired. Please log in again.',
    FORBIDDEN: 'You do not have permission to perform this action.',
    NOT_FOUND: 'The requested resource was not found.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    SERVER_ERROR: 'Server error. Please try again later.',
    OFFLINE_ERROR: 'You are offline. Some features may not be available.',
  };
  
  // Success messages
  export const SUCCESS_MESSAGES = {
    LIST_CREATED: 'List created successfully!',
    LIST_UPDATED: 'List updated successfully!',
    LIST_DELETED: 'List deleted successfully!',
    LIST_SHARED: 'List shared successfully!',
    ITEM_ADDED: 'Item added to list!',
    ITEM_UPDATED: 'Item updated successfully!',
    ITEM_DELETED: 'Item removed from list!',
    PROFILE_UPDATED: 'Profile updated successfully!',
    PASSWORD_CHANGED: 'Password changed successfully!',
    SETTINGS_SAVED: 'Settings saved successfully!',
  };
  
  // Feature flags
  export const FEATURE_FLAGS = {
    BIOMETRIC_AUTH: true,
    PRICE_TRACKING: true,
    BARCODE_SCANNING: true,
    VOICE_INPUT: false,
    AI_SUGGESTIONS: false,
    SOCIAL_FEATURES: false,
    ADVANCED_ANALYTICS: true,
    DARK_MODE: true,
    OFFLINE_MODE: true,
  };