import { config as baseConfig } from './wdio.conf';

export const config: WebdriverIO.Config = {
    ...baseConfig,
    specs: ['./test/specs/chrome.test.e2e.ts'],
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            // args: ['--headless', '--disable-gpu', '--window-size=1280,720']
            args: ['--window-size=1280,720']
        }
    }],
    port: undefined
};