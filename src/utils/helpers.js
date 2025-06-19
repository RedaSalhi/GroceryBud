import UUID from 'react-native-uuid';

/**
 * Generate a RFC4122 UUID string (uses 'react-native-uuid' for cross-platform support)
 */
export const generateUUID = () => {
  // Use UUID directly - it's already imported correctly
  return UUID.v4();
};

export default { generateUUID };
