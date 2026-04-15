import BasePage from './base.page';

/**
 * Page Object for Spaces Application
 * Contains all selectors and methods for interacting with the Spaces app
 */
class SpacesPage extends BasePage {

    public async ensureSpacesOptionSelected(): Promise<boolean> {
        await this.skipOnboardingIfPresent();
        return await this.ensureAccessibilityElementSelected('Espaços')
    }

    public async validateFirstProjectInSpacesDirectory() {
        const isVisible = await this.isElementVisible(this.getElementByText('345 Rua Jouvert Buck'));
        expect(isVisible).toBe(true);
        if (!isVisible) {
            throw new Error('First project in spaces directory is not visible');
        }
    }

}

export default new SpacesPage()