import { test as base } from '@playwright/test'

export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    await page.evaluate(_ => { }, `testingbot_executor: ${JSON.stringify({ action: 'setSessionName', arguments: { name: testInfo.project.name } })}`)
    await use(page)
    if (testInfo.status === 'passed') {
      await page.evaluate(_ => { }, `testingbot_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { passed: true } })}`)
    }
    else if (["failed", "interrupted", "timedOut"].includes(testInfo.status!)) {
      await page.evaluate(_ => { }, `testingbot_executor: ${JSON.stringify({ action: 'setSessionStatus', arguments: { passed: false, reason: testInfo.error?.message } })}`)
    }
  },
})

export { expect } from '@playwright/test'
