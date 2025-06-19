import { test } from 'node:test';
import assert from 'node:assert/strict';
import register from '@babel/register';
register({ presets: ['babel-preset-expo'], extensions: ['.js', '.jsx'] });

import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { ThemeProvider, useTheme } from '../../src/context/ThemeContext.js';

function Capture() {
  global.__theme = useTheme();
  return null;
}

test('fonts and colors remain defined after initialization and updateTheme', async () => {
  await act(async () => {
    TestRenderer.create(
      <ThemeProvider>
        <Capture />
      </ThemeProvider>
    );
    await Promise.resolve();
  });

  assert.ok(global.__theme.fonts.regular);
  assert.ok(global.__theme.fonts.medium);
  assert.ok(global.__theme.fonts.bold);
  assert.ok(global.__theme.colors.border);
  assert.ok(global.__theme.colors.primary);

  await act(async () => {
    global.__theme.updateTheme({ colors: { test: '#000' } });
    await Promise.resolve();
  });

  assert.ok(global.__theme.fonts.regular);
  assert.ok(global.__theme.fonts.medium);
  assert.ok(global.__theme.fonts.bold);
  assert.ok(global.__theme.colors.border);
  assert.ok(global.__theme.colors.primary);
});
