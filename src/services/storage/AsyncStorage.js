let lib;
try {
  lib = require('@react-native-async-storage/async-storage');
} catch {
  const store = new Map();
  lib = {
    getItem: async (k) => (store.has(k) ? store.get(k) : null),
    setItem: async (k, v) => {
      store.set(k, String(v));
    },
    removeItem: async (k) => {
      store.delete(k);
    },
    clear: async () => {
      store.clear();
    },
  };
}

export const getItem = async (key) => {
  try {
    return await lib.getItem(key);
  } catch {
    return null;
  }
};

export const setItem = async (key, value) => {
  await lib.setItem(key, String(value));
};

export const removeItem = async (key) => {
  await lib.removeItem(key);
};

export const clear = async () => {
  if (lib.clear) await lib.clear();
};

export default { getItem, setItem, removeItem, clear };
