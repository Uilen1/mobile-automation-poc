import { $ } from '@wdio/globals'

/**
 * Page Object for Clock Application
 * Contains all selectors and methods for interacting with the Clock app
 */
class BasePage {
    // Timeout constants for better maintainability
    protected readonly DEFAULT_TIMEOUT = 10000
    protected readonly EXTENDED_TIMEOUT = 15000

    protected getElementByAccessibilityId(text: string) {
        return $(`~${text}`)
    }

    protected getButtonByText(text: string) {
        return $(`//android.widget.Button[@text="${text}"]`)
    }

    protected getElementByText(text: string) {
        return $(`//android.widget.TextView[@text="${text}"]`)
    }

    protected getElementByResourceId(resourceId: string) {
        return $(`//android.widget.TextView[@resource-id="${resourceId}"]`)
    }

    /**
     * Checks if the time display is visible
     * @returns Promise<boolean> - True if element is displayed
     */
    public async isTimeDisplayVisible(): Promise<boolean> {
        return await this.timeDisplay.waitForDisplayed({
            timeout: this.DEFAULT_TIMEOUT,
            timeoutMsg: 'Time display should be visible within 10 seconds'
        })
    }
}

export default BasePage