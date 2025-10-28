import { _android } from 'playwright-core';
import { test as base } from './baseTest';
import { getConnectWsEndpoint } from '../testingbot.config';

export const test = base.extend({
  androidPage: async ({}, use) => {
    const wsEndpoint = getConnectWsEndpoint({
      browserName: 'chrome',
      browserVersion: '15.0',
      platformName: 'Android',
      deviceName: 'Pixel 9'
    });

    const device = await _android.connect(wsEndpoint)
  const context = await device.launchBrowser()
  const [ page ] = context.pages()

    await use(page);

    await context.close();
    await device.close();
  },
});
export { expect } from './baseTest';

