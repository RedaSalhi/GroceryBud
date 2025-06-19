import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const filePath = path.resolve('src/screens/lists/ListDetailsScreen.js');
const fileContents = fs.readFileSync(filePath, 'utf8');

test('ListDetailsScreen contains title element', () => {
  assert.ok(fileContents.includes('testID="list-title"'));
});
