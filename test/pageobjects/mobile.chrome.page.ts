import Page from './page';

/**
 * Mobile Chrome page object
 * Reusable selectors and actions for Chrome within Android emulador.
 */
class MobileChromePage extends Page {
    public get searchInput() {
        return $('input[name="q"]');
    }

    public get resultsContainer() {
        return $('#search');
    }

    public async searchFor(query: string) {
        await this.searchInput.waitForDisplayed({ timeout: 10000 });
        await this.searchInput.setValue(query);
        await browser.keys(['Enter']);
        await this.resultsContainer.waitForDisplayed({ timeout: 15000 });
    }

    public open() {
        return browser.url('https://www.google.com');
    }
}

export default new MobileChromePage();