import { expect } from '@wdio/globals';
import MobileChromePage from '../pageobjects/mobile.chrome.page';

describe('Mobile Chrome Browser - Android Web Tests', () => {
    before(async () => {
        console.log('🔧 Setting up mobile Chrome browser suite...');
        await MobileChromePage.open();
        console.log('✅ Setup complete: Google mobile page loaded');
    });

    afterEach(async function () {
        console.log(`✅ Test completed: ${this.currentTest?.title}`);
    });

    it('should open Google homepage on mobile Chrome', async () => {
        await MobileChromePage.searchInput.waitForDisplayed({ timeout: 10000 });
        const title = await browser.getTitle();
        expect(title).toContain('Google');
    });

    it('should search for WebDriverIO on mobile Chrome', async () => {
        await MobileChromePage.searchFor('WebDriverIO');
        const title = await browser.getTitle();
        expect(title).toContain('WebDriverIO');
    });
});