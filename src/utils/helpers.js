import UUID from 'react-native-uuid';

/**
 * Generate a RFC4122 UUID string (uses 'react-native-uuid' for cross-platform support)
 */
export const generateUUID = () => {

  const lib = uuid && typeof uuid.v4 === 'function' ? uuid : uuid.default;
  return lib.v4();
  const generator = uuid.v4 || (uuid.default && uuid.default.v4);
  return generator();
  return (UUID.v4 || UUID.default?.v4)();
};

export default { generateUUID };
