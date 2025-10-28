## TestingBot Playwright Test Node Example

TestingBot provides an online grid of browsers and mobile devices to run Automated tests on via Playwright Test.
This example demonstrates how to use Playwright Test to run a test on a remote TestingBot browser.

### Environment Setup

   * Clone the repo
   * Retrieve your TestingBot Key (`TB_KEY`) and Secret (`TB_SECRET`) from the [TestingBot Dashboard](https://testingbot.com/members/) and set these as environment variables
   * Run `npm i`

### Run Desktop Tests
The sample test will run in parallel on 3 different browsers (see `playwright.config.ts`).
To start the test, run this command:
`npm run sample-test`

### Run Android Tests
To run a Playwright test on an Android emulator/device, you can use the `android.fixture.ts` to instruct Playwright to connect to the TestingBot grid.
To start a mobile Android test, run this command:
`npm run android-test`

### Results
You can see the results of your tests in the [TestingBot Dashboard](https://testingbot.com/members/) 


### Resources
##### [TestingBot Playwright Test Documentation](https://testingbot.com/support/web-automate/playwright/playwright-test)

##### [TestingBot Playwright Android Documentation](https://testingbot.com/support/web-automate/playwright/mobile)

##### [Playwright Documentation](https://playwright.dev/)
