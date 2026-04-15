import BasePage from './base.page';

/**
 * Page Object for Clock Application
 * Contains all selectors and methods for interacting with the Clock app
 */
class ProjectsPage extends BasePage {

    public async ensureProjectsOptionSelected(): Promise<boolean> {
        await this.skipOnboardingIfPresent();
        return await this.ensureAccessibilityElementSelected('Projetos')
    }

    public async firstAccessValidation() {
        await this.getElementByText('Boas-vindas ao \nMatterport');
    }

}

export default new ProjectsPage()