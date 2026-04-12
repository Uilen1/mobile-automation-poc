/**
 * Configuration for Chrome Desktop Browser Tests
 * Port: Dynamic (Chrome/Chromedriver handles own port)
 * Platform: Windows/Local
 * Browser: Chrome Desktop
 */
export const config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    specs: ['./test/specs/chrome.test.e2e.ts'],
    exclude: [],
    maxInstances: 1,
    logLevel: 'silent',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [],
    framework: 'mocha',
    reporters: ['spec', ['allure', { outputDir: 'allure-results' }]],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--window-size=1280,720']
        }
    }]
};
