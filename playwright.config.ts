/* eslint-disable notice/notice */

import { defineConfig, devices } from '@playwright/test'
import { getConnectWsEndpoint } from './testingbot.config'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  testDir: './tests',

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
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: process.env.BASE_URL || 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video on first retry */
    video: 'retain-on-failure',

    /* Action timeout */
    actionTimeout: 10 * 1000,

    /* Navigation timeout */
    navigationTimeout: 30 * 1000,
  },

  projects: [
    {
      name: 'playwright-chrome@latest:Windows 10',
      use: {
        connectOptions: { 
          wsEndpoint: getConnectWsEndpoint({
            browserName: 'chrome',
            browserVersion: 'latest',
            platform: 'WIN10'
          }) 
        }
      },
    },
    {
      name: 'playwright-webkit@latest:macOS Sequoia',
      use: {
        connectOptions: { 
          wsEndpoint: getConnectWsEndpoint({
            browserName: 'safari',
            platform: 'SEQUOIA'
          }) 
        }
      },
    },
    {
      name: 'playwright-firefox@latest:Linux',
      use: {
        connectOptions: { 
          wsEndpoint: getConnectWsEndpoint({
            browserName: 'firefox',
            browserVersion: 'latest',
            platform: 'LINUX'
          }) 
        }
      }
    }
  ]
})
