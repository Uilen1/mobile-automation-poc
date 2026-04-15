import BasePage from './base.page';

/**
 * Page Object for Clock Application
 * Contains all selectors and methods for interacting with the Clock app
 */
class LoginPage extends BasePage {

    public async setupPermissions() {
        await this.allowForegroundPermissionDialogs();
        const isVisible = await this.isElementVisible(this.getElementByText('Ative o acesso à câmera'));
        if (isVisible) {
            await this.getElementByText('Ative o acesso à câmera').click();
            await this.getElementByAccessibilityId('Continuar').click();
        }
        await this.allowForegroundPermissionDialogs();
    }

    public async signInWithGoogle(email: string) {
        await this.allowForegroundPermissionDialogs();
        await this.getElementByAccessibilityId('Entrar').click();
        await this.getButtonByText('Sign in with Google').click();
        await this.getElementByText(email).click();
        await this.allowForegroundPermissionDialogs();
    }


    public async login(email: string): Promise<void> {
        await this.signInWithGoogle(email);
        await this.setupPermissions();
    }

}

export default new LoginPage()