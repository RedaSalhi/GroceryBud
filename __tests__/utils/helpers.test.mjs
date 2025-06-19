import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateUUID } from '../../src/utils/helpers.js';

test('generateUUID returns valid uuid', () => {
  const id1 = generateUUID();
  const id2 = generateUUID();
  assert.match(id1, /^[0-9a-f-]{36}$/i);
  assert.notEqual(id1, id2);
});
