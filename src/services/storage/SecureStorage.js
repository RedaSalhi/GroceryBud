let lib;
try {
  lib = require('expo-secure-store');
} catch {
  const memory = new Map();
  lib = {
    getItemAsync: async (k) => (memory.has(k) ? memory.get(k) : null),
    setItemAsync: async (k, v) => {
      memory.set(k, String(v));
    },
    deleteItemAsync: async (k) => {
      memory.delete(k);
    },
  };
}

export const getItem = async (key) => {
  try {
    return await lib.getItemAsync(key);
  } catch {
    return null;
  }
};

export const setItem = async (key, value) => {
  await lib.setItemAsync(key, String(value));
};

export const removeItem = async (key) => {
  await lib.deleteItemAsync(key);
};

export default { getItem, setItem, removeItem };
