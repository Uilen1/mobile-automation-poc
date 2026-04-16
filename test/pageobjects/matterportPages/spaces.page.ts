import BasePage from './base.page';

type NewSpaceAddressData = {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
    showcaseName: string
}

/**
 * Page Object for Spaces Application
 * Contains all selectors and methods for interacting with the Spaces app
 */
class SpacesPage extends BasePage {
    private readonly selectors = {
        balloonCard: 'id=com.matterport.android.capture:id/balloon_card',
        newFabButton: 'com.matterport.android.capture:id/newFab',
        streetInput: 'com.matterport.android.capture:id/editTextModelInformationStreetAddress',
        cityInput: 'com.matterport.android.capture:id/editTextModelInformationCityAddress',
        stateInput: 'com.matterport.android.capture:id/editTextModelInformationStateAddress',
        postalCodeInput: 'com.matterport.android.capture:id/editTextModelInformationPostalAddress',
        countryInput: 'com.matterport.android.capture:id/editTextModelInformationCountryAddress',
        showcaseNameInput: 'com.matterport.android.capture:id/editTextModelInformationShowCaseNameNewJob',
        saveButton: 'com.matterport.android.capture:id/action_save',
        scanPreviewView: '//android.widget.FrameLayout[@resource-id="com.matterport.android.capture:id/previewView"]/android.view.View'
    }

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

    public async createNewSpaceWithAddress(data?: Partial<NewSpaceAddressData>): Promise<void> {
        const formData: NewSpaceAddressData = {
            street: 'rua california',
            city: 'Morro Agudo',
            state: 'São Paulo',
            postalCode: '14640000',
            country: 'Brasil',
            showcaseName: `Automacao ${Date.now()}`,
            ...data
        }
        await this.skipOnboardingIfPresent();
        await this.clickElementIfPresent(this.selectors.balloonCard)
        await this.clickElementById(this.selectors.newFabButton)
        await this.setInputValueById(this.selectors.streetInput, formData.street)
        await this.setInputValueById(this.selectors.cityInput, formData.city)
        await this.setInputValueById(this.selectors.stateInput, formData.state)
        await this.setInputValueById(this.selectors.postalCodeInput, formData.postalCode)
        await this.setInputValueById(this.selectors.countryInput, formData.country)
        await this.setInputValueById(this.selectors.showcaseNameInput, formData.showcaseName)
        await this.clickElementById(this.selectors.saveButton)
    }

    public async startScanFromBalloonCard(): Promise<void> {
        await this.clickElementIfPresent(this.selectors.balloonCard)
        await this.getElementByAccessibilityId('Iniciar digitalização').click()
    }

    public async isScanPreviewVisible(): Promise<boolean> {
        return await this.isElementVisible(this.getElementByXpath(this.selectors.scanPreviewView))
    }

}

export default new SpacesPage()