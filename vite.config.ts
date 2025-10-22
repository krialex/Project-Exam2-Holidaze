/// <reference types="vitest" /> 
/// <reference types="@testing-library/jest-dom" />
import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, 
    environment: 'jsdom', 
    css: true, 
    setupFiles: ['./Tests/setup.ts'], 
    coverage: {
      provider: 'v8', 
    },
  },
} as UserConfig);

