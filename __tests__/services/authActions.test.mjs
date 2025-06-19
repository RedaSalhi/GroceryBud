import { test } from 'node:test';
import assert from 'node:assert/strict';
import AsyncStorage from '../../src/services/storage/AsyncStorage.js';
import { forgotPasswordRequest, resetPasswordRequest } from '../../src/context/authMockService.js';

const USERS_KEY = 'MOCK_USERS_DB';
const tokenKey = (email) => `RESET_TOKEN_${email}`;

test('forgotPasswordRequest stores a reset token', async () => {
  await AsyncStorage.clear();
  const user = { uid: '1', email: 'test@example.com', password: '123' };
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify([user]));

  const result = await forgotPasswordRequest('test@example.com');
  assert.equal(result.success, true);
  const stored = await AsyncStorage.getItem(tokenKey('test@example.com'));
  assert.ok(stored);
});

test('resetPasswordRequest changes password and clears token', async () => {
  await AsyncStorage.clear();
  const user = { uid: '1', email: 'test@example.com', password: 'old' };
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify([user]));
  await AsyncStorage.setItem(tokenKey('test@example.com'), 'token');

  const res = await resetPasswordRequest('test@example.com', 'newpass');
  assert.equal(res.success, true);

  const users = JSON.parse(await AsyncStorage.getItem(USERS_KEY));
  assert.equal(users[0].password, 'newpass');
  const token = await AsyncStorage.getItem(tokenKey('test@example.com'));
  assert.equal(token, null);
});
