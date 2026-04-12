import Page from './page';

class MobileChromePage extends Page {

    public get searchInput() {
        return $('textarea[name="q"]');
    }

    public get searchInputFallback() {
        return $('input[name="q"]');
    }

    public get acceptCookiesBtn() {
        return $('//button[contains(.,"Aceitar") or contains(.,"Accept")]');
    }

    public async acceptCookiesIfPresent() {
        if (await this.acceptCookiesBtn.isExisting()) {
            await this.acceptCookiesBtn.click();
        }
    }

    public async searchFor(query: string) {
        await this.acceptCookiesIfPresent();

        let input = await this.searchInput;

        if (!(await input.isExisting())) {
            input = await this.searchInputFallback;
        }

        await input.waitForDisplayed({ timeout: 10000 });
        await input.click();
        await input.setValue(query);

        // Melhor forma no mobile
        await browser.keys('Enter');

        // espera algo confiável (título muda)
        await browser.waitUntil(async () => {
            return (await browser.getTitle()).toLowerCase().includes(query.toLowerCase());
        }, { timeout: 15000 });
    }

    public open() {
        return browser.url('https://www.google.com');
    }
}

export default new MobileChromePage();