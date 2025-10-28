import { test, expect } from './android.fixture';

test('Sample TestingBot Android test', async ({ androidPage }) => {
  await androidPage.goto('https://testingbot.com');
  await expect(androidPage).toHaveTitle(/TestingBot/);
});
