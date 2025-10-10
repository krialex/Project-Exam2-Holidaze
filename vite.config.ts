/// <reference types="vitest" /> 
import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Allows using describe, it, expect without importing
    environment: 'jsdom', // Simulates a browser environment for DOM testing
    css: true, // Enables CSS imports within tests
    setupFiles: ['./Tests/setup.ts'], // Path to a setup file run before tests
    //exclude: ['**/e2e/**', ...configDefaults.exclude], // Excludes certain files/folders from tests
    coverage: {
      provider: 'v8', // Specifies the coverage provider
      // You can add more coverage options here, e.g., thresholds, reports
    },
  },
} as UserConfig);


/**
 * import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
 */