import { test } from 'node:test';
import assert from 'node:assert/strict';
import register from '@babel/register';
register({ presets: ['babel-preset-expo'], extensions: ['.js', '.jsx'] });

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { getUserFullNameFromData } = require('../../src/context/AuthContext.js');

test('getUserFullName returns expected values', () => {
  assert.equal(getUserFullNameFromData({ firstName: 'John', lastName: 'Doe' }), 'John Doe');
  assert.equal(getUserFullNameFromData({ displayName: 'Jane D' }), 'Jane D');
  assert.equal(getUserFullNameFromData({ email: 'foo@example.com' }), 'foo@example.com');
});
