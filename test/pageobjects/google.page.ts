import Page from './page';

/**
 * Google page object
 */
class GooglePage extends Page {
    /**
     * define selectors using getter methods
     */
    public get searchInput() {
        return $('#APjFqb');
    }

    public get searchButton() {
        return $('input[value="Pesquisa Google"]');
    }

    public get results() {
        return $('#search');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async searchFor(query: string) {
        await this.searchInput.setValue(query);
        await this.searchButton.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open() {
        return browser.url('https://www.google.com');
    }
}

export default new GooglePage();