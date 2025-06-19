import { test } from 'node:test';
import assert from 'node:assert/strict';
import AsyncStorage from '../../src/services/storage/AsyncStorage.js';
import SecureStorage from '../../src/services/storage/SecureStorage.js';

test('AsyncStorage basic set/get/remove', async () => {
  await AsyncStorage.setItem('foo', 'bar');
  assert.equal(await AsyncStorage.getItem('foo'), 'bar');
  await AsyncStorage.removeItem('foo');
  assert.equal(await AsyncStorage.getItem('foo'), null);
});

test('SecureStorage basic set/get/remove', async () => {
  await SecureStorage.setItem('token', '123');
  assert.equal(await SecureStorage.getItem('token'), '123');
  await SecureStorage.removeItem('token');
  assert.equal(await SecureStorage.getItem('token'), null);
});
