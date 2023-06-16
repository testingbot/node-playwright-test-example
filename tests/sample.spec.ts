const { test, expect } = require('@playwright/test')

test('Sample TestingBot test', async ({ page }, testInfo) => {
	try {
		await page.evaluate(_ => {}, `testingbot_executor: ${JSON.stringify({action: 'setSessionName', arguments: { name: testInfo.project.name }})}`)
		await page.goto('https://testingbot.com/',{ waitUntil: 'networkidle' })
		await page.evaluate(_ => {}, `testingbot_executor: ${JSON.stringify({action: 'setSessionStatus', arguments: { passed: true }})}`)
	} catch (e) {
		await page.evaluate(_ => {}, `testingbot_executor: ${JSON.stringify({action: 'setSessionStatus', arguments: { passed: false, reason: e.message }})}`)
	}
})
