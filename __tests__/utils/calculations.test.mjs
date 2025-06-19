import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateShoppingStats } from '../../src/utils/calculations.js';

test('calculateShoppingStats computes totals', () => {
  const items = [
    { price: 2, quantity: 3, completed: true },
    { price: 1.5, quantity: 2 },
  ];
  const stats = calculateShoppingStats(items, 10);
  assert.equal(stats.totalItems, 2);
  assert.equal(stats.completedItems, 1);
  assert.equal(stats.totalValue, 9);
  assert.equal(stats.completedValue, 6);
  assert.equal(stats.remainingBudget, 4);
});
