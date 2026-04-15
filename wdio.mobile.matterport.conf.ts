/**
 * Configuration for Mobile Native Tests (Clock App)
 * Port: 4723 (Appium)
 * Platform: Android/Emulator
 * App: com.google.android.deskclock
 */
export const config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    port: 4723,
    specs: ['./test/specs/app.matterport.test.e2e.ts'],
    exclude: [],
    maxInstances: 10,
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
        'appium:deviceName': 'RQ8R70G7AJD',
        'appium:platformVersion': '13',
        'appium:automationName': 'UiAutomator2',
        'appium:appPackage': 'com.matterport.android.capture'
    }]
};
