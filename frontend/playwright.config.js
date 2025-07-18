"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_process_1 = require("node:process");
var test_1 = require("@playwright/test");
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
/**
 * See https://playwright.dev/docs/test-configuration.
 */
exports.default = (0, test_1.defineConfig)({
    testDir: './e2e',
    /* Maximum time one test can run for. */
    timeout: 30 * 1000,
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 5000,
    },
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!node_process_1.default.env.CI,
    /* Retry on CI only */
    retries: node_process_1.default.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: node_process_1.default.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 0,
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: node_process_1.default.env.CI ? 'http://localhost:4173' : 'http://localhost:5173',
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
        /* Only on CI systems run the tests headless */
        headless: !!node_process_1.default.env.CI,
    },
    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: __assign({}, test_1.devices['Desktop Chrome']),
        },
        {
            name: 'firefox',
            use: __assign({}, test_1.devices['Desktop Firefox']),
        },
        {
            name: 'webkit',
            use: __assign({}, test_1.devices['Desktop Safari']),
        },
        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: {
        //     ...devices['Pixel 5'],
        //   },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: {
        //     ...devices['iPhone 12'],
        //   },
        // },
        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: {
        //     channel: 'msedge',
        //   },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: {
        //     channel: 'chrome',
        //   },
        // },
    ],
    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    // outputDir: 'test-results/',
    /* Run your local dev server before starting the tests */
    webServer: {
        /**
         * Use the dev server by default for faster feedback loop.
         * Use the preview server on CI for more realistic testing.
         * Playwright will re-use the local server if there is already a dev-server running.
         */
        command: node_process_1.default.env.CI ? 'npm run preview' : 'npm run dev',
        port: node_process_1.default.env.CI ? 4173 : 5173,
        reuseExistingServer: !node_process_1.default.env.CI,
    },
});
