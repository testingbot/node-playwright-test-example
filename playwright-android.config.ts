/* eslint-disable notice/notice */

import { defineConfig } from '@playwright/test'

/**
 * Android-specific Playwright configuration
 * This config is used for running Android mobile tests via TestingBot
 */
export default defineConfig({

  testDir: './tests',

  /* Only run Android test files */
  testMatch: '**/android*.spec.ts',

  /* Maximum time one test can run for. */
  timeout: process.env.TEST_TIMEOUT ? parseInt(process.env.TEST_TIMEOUT) : 30 * 1000,

  /* Maximum time to wait for the page to load */
  expect: {
    timeout: 10 * 1000,
  },

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.TEST_RETRIES ? parseInt(process.env.TEST_RETRIES) : process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ...(process.env.CI ? [['github'] as const] : []),
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Action timeout */
    actionTimeout: 10 * 1000,

    /* Navigation timeout */
    navigationTimeout: 30 * 1000,
  },

  /* Single default project for Android tests - the actual connection is handled by the custom fixture */
  projects: [
    {
      name: 'android'
    }
  ]
})