import allureReporter from '@wdio/allure-reporter'

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
    reporters: ['spec', ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true
    }]],
    mochaOpts: {
        ui: 'bdd',
        timeout: 180000
    },
    afterTest: async function (
        test: { title: string },
        _context: unknown,
        result: { error?: Error }
    ) {
        const screenshot = await browser.takeScreenshot()
        const label = result.error ? `FAILED: ${test.title}` : test.title
        allureReporter.addAttachment(label, Buffer.from(screenshot, 'base64'), 'image/png')
    },

    capabilities: [{
        platformName: 'Android', // Platform name for Appium
        'appium:deviceName': 'RQ8R70G7AJD', // Update to match your emulator/device name (use `adb devices` to find it)
        'appium:platformVersion': '13', //  Update to match your emulator/device version
        'appium:automationName': 'UiAutomator2', // Preferred automation engine for Android
        'appium:autoGrantPermissions': true, // Automatically grants all permissions on app install
        'appium:noReset': false, // Ensures app data is cleared for a fresh start
        'appium:fullReset': false, // Avoids uninstalling the app after tests
        'appium:appPackage': 'com.matterport.android.capture' // Update to your app's package name
    }]
};
