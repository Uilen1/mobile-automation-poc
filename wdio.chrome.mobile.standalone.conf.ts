/**
 * Configuration for Chrome Mobile Tests (Android)
 * Port: 4723 (Appium)
 * Platform: Android/Emulator
 * Browser: Chrome on Android
 * Note: Requires Appium server running on port 4723
 */
export const config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    port: 4723,
    specs: ['./test/specs/chrome.mobile.test.e2e.ts'],
    exclude: [],
    maxInstances: 1,
    outputDir: './logs/chrome-mobile',
    logLevel: 'silent',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        ['appium', {
            command: 'appium',
            args: {
                address: '127.0.0.1',
                port: 4723,
                allowInsecure: '*:chromedriver_autodownload'
            }
        }]
    ],
    framework: 'mocha',
    reporters: ['spec', ['allure', { outputDir: 'allure-results' }]],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'emulator-5554',
        'appium:platformVersion': '14',
        'appium:automationName': 'UiAutomator2',
        'appium:browserName': 'Chrome',
        'appium:autoGrantPermissions': true,
        'appium:chromeOptions': {
            w3c: false
        }
    }]
};
