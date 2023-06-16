/* eslint-disable notice/notice */

import { defineConfig } from '@playwright/test'
import { getCdpEndpoint } from './testingbot.config'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  testDir: './tests',

  /* Maximum time one test can run for. */
  timeout: 30 * 1000,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'playwright-chrome@latest:Windows 10',
      use: {
        connectOptions: { 
          wsEndpoint: getCdpEndpoint({
            browserName: 'chrome',
            browserVersion: 'latest',
            platform: 'WIN10'
          }) 
        }
      },
    },
    {
      name: 'playwright-webkit@latest:macOS Ventura',
      use: {
        connectOptions: { 
          wsEndpoint: getCdpEndpoint({
            browserName: 'safari',
            platform: 'VENTURA'
          }) 
        }
      },
    },
    {
      name: 'playwright-firefox@latest:Linux',
      use: {
        connectOptions: { 
          wsEndpoint: getCdpEndpoint({
            browserName: 'firefox',
            browserVersion: 'latest',
            platform: 'LINUX'
          }) 
        }
      }
    }
  ]
})