import UUID from 'react-native-uuid';

/**
 * Generate a RFC4122 UUID string (uses 'react-native-uuid' for cross-platform support)
 */
export const generateUUID = () => {
  const generator = uuid.v4 || (uuid.default && uuid.default.v4);
  return generator();
};

export default { generateUUID };
