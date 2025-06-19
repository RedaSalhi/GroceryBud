import UUID from 'react-native-uuid';

/**
 * Generate a RFC4122 UUID string (uses 'react-native-uuid' for cross-platform support)
 */
export const generateUUID = () => {
  return (UUID.v4 || UUID.default?.v4)();
};

export default { generateUUID };
