import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '../services/storage/AsyncStorage';

const useStorage = (key, initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(key);
      if (stored !== null && stored !== undefined) {
        setValue(stored);
      }
    })();
  }, [key]);

  const save = useCallback(async (val) => {
    setValue(val);
    await AsyncStorage.setItem(key, val);
  }, [key]);

  const remove = useCallback(async () => {
    setValue(initialValue);
    await AsyncStorage.removeItem(key);
  }, [key, initialValue]);

  return [value, save, remove];
};

export default useStorage;
