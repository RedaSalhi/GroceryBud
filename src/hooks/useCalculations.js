import { useMemo } from 'react';
import { calculateShoppingStats } from '../utils/calculations';

const useCalculations = (items = [], budget = 0) => {
  return useMemo(() => calculateShoppingStats(items, budget), [items, budget]);
};

export default useCalculations;
