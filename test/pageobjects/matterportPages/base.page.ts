import { $, browser } from '@wdio/globals';

/**
 * Page Object for Clock Application
 * Contains all selectors and methods for interacting with the Clock app
 */
class BasePage {
    // Timeout constants for better maintainability
    protected readonly DEFAULT_TIMEOUT = 10000
    protected readonly EXTENDED_TIMEOUT = 15000

    protected getElementByAccessibilityId(text: string) {
        const element = $(`~${text}`);
        element.waitForDisplayed({
            timeout: this.DEFAULT_TIMEOUT,
            timeoutMsg: `Element with accessibility id "${text}" should be visible within ${this.DEFAULT_TIMEOUT / 1000} seconds`
        });
        return element;
    }

    protected getButtonByText(text: string) {
        const element = $(`//android.widget.Button[@text="${text}"]`);
        element.waitForDisplayed({
            timeout: this.DEFAULT_TIMEOUT,
            timeoutMsg: `Button with text "${text}" should be visible within ${this.DEFAULT_TIMEOUT / 1000} seconds`
        });
        return element;
    }

    protected getButtonByXpath(xpath: string) {
        const element = $(xpath);
        element.waitForDisplayed({
            timeout: this.DEFAULT_TIMEOUT,
            timeoutMsg: `Button with xpath "${xpath}" should be visible within ${this.DEFAULT_TIMEOUT / 1000} seconds`
        });
        return element;
    }

    protected getElementByXpath(xpath: string) {
        const element = $(xpath);
        element.waitForDisplayed({
            timeout: this.DEFAULT_TIMEOUT,
            timeoutMsg: `Element with xpath "${xpath}" should be visible within ${this.DEFAULT_TIMEOUT / 1000} seconds`
        });
        return element;
    }

    protected getElementByText(text: string) {
        const element = $(`//android.widget.TextView[@text="${text}"]`);
        element.waitForDisplayed({
            timeout: this.DEFAULT_TIMEOUT,
            timeoutMsg: `Element with text "${text}" should be visible within ${this.DEFAULT_TIMEOUT / 1000} seconds`
        });
        return element;
    }

    protected getElementByResourceId(resourceId: string) {
        const element = $(`//android.widget.TextView[@resource-id="${resourceId}"]`);
        element.waitForDisplayed({
            timeout: this.DEFAULT_TIMEOUT,
            timeoutMsg: `Element with resource id "${resourceId}" should be visible within ${this.DEFAULT_TIMEOUT / 1000} seconds`
        });
        return element;
    }

    protected getElementById(resourceId: string) {
        const element = $(`id=${resourceId}`);
        element.waitForDisplayed({
            timeout: this.DEFAULT_TIMEOUT,
            timeoutMsg: `Element with id "${resourceId}" should be visible within ${this.DEFAULT_TIMEOUT / 1000} seconds`
        });
        return element;
    }

    protected getElementBySelector(selector: string) {
        const element = $(selector);
        element.waitForDisplayed({
            timeout: this.DEFAULT_TIMEOUT,
            timeoutMsg: `Element with selector "${selector}" should be visible within ${this.DEFAULT_TIMEOUT / 1000} seconds`
        });
        return element;
    }

    protected async clickElementById(resourceId: string): Promise<void> {
        await this.getElementById(resourceId).click()
    }

    protected async clickElementBySelector(selector: ReturnType<typeof $>): Promise<void> {
        await selector.click()
    }

    /**
     * Scrolls down the page to make lower elements visible.
     * Uses swipe gesture to scroll smoothly on mobile devices.
     * @param scrollDistance - Distance to scroll in pixels (default: 500)
     */
    protected async scrollDown(scrollDistance: number = 500): Promise<void> {
        const windowSize = await browser.getWindowSize()
        const startX = windowSize.width / 2
        const startY = windowSize.height * 0.8
        const endY = startY - scrollDistance

        await browser.performActions([
            {
                type: 'pointer',
                id: 'finger',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: startY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pointerMove', duration: 500, x: startX, y: endY },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ])
    }

    /**
     * Dismisses the on-screen keyboard if it is open.
     * Falls back silently if the keyboard is not present.
     */
    protected async hideKeyboard(): Promise<void> {
        try {
            await driver.hideKeyboard()
        } catch {
            // keyboard was not open, nothing to do
        }
    }

    protected async setInputValueById(resourceId: string, value: string): Promise<void> {
        const input = this.getElementById(resourceId)
        await this.scrollDown()
        await input.click()
        await input.clearValue()
        await input.setValue(value)
        await this.hideKeyboard()
    }

    /**
     * Checks if the element is visible
     * @param element - The element to check visibility for
     * @returns Promise<boolean> - True if element is displayed
     */
    public async isElementVisible(element: ReturnType<typeof $>): Promise<boolean> {
        const resolvedElement = await element
        return await resolvedElement.waitForDisplayed({
            timeout: this.DEFAULT_TIMEOUT,
            timeoutMsg: `Element should be visible within ${this.DEFAULT_TIMEOUT / 1000} seconds`
        }).catch(() => false)
    }

    /**
     * Clicks a selector repeatedly while it is visible during a time window.
     * Useful for chained Android permission dialogs.
     */
    protected async clickWhileVisible(
        selector: string,
        timeoutMs = this.DEFAULT_TIMEOUT,
        intervalMs = 300
    ): Promise<number> {
        const deadline = Date.now() + timeoutMs
        let clickCount = 0
        let pollCount = 0

        console.log(`[clickWhileVisible] START | selector: "${selector}" | timeout: ${timeoutMs}ms`)

        while (Date.now() < deadline) {
            pollCount++
            try {
                const element = $(selector)
                const shortWait = Math.min(Math.max(intervalMs, 200), 1000)
                const becameVisible = await element.waitForDisplayed({
                    timeout: shortWait,
                    interval: 100
                }).then(() => true).catch(() => false)

                if (!becameVisible) {
                    await browser.pause(intervalMs)
                    continue
                }

                try {
                    await element.click()
                } catch (clickError) {
                    await element.touchAction('tap')
                }
                clickCount++
                console.log(`[clickWhileVisible] END | selector: "${selector}" | total clicks: ${clickCount} | polls: ${pollCount}`)
                return clickCount

            } catch (err) {
                console.log(`[clickWhileVisible] Poll #${pollCount} | ERROR: ${(err as Error).message}`)
                await browser.pause(intervalMs)
            }
        }

        console.log(`[clickWhileVisible] END | selector: "${selector}" | total clicks: ${clickCount} | polls: ${pollCount}`)
        return clickCount
    }

    /**
     * Handles Android "Allow only while using the app" permission prompts.
     */
    public async allowForegroundPermissionDialogs(timeoutMs = this.DEFAULT_TIMEOUT): Promise<number> {
        return await this.clickWhileVisible(
            'id=com.android.permissioncontroller:id/permission_allow_foreground_only_button',
            timeoutMs
        )
    }

    /**
     * Handles Android "Skip Onboarding" prompts.
     */
    public async skipOnboardingIfPresent(timeoutMs = this.DEFAULT_TIMEOUT): Promise<number> {
        return await this.clickWhileVisible(
            'id=com.matterport.android.capture:id/button_skip_onboarding',
            timeoutMs
        )
    }

    public async clickElementIfPresent(selector: string, timeoutMs = this.DEFAULT_TIMEOUT): Promise<number> {
        return await this.clickWhileVisible(
            selector,
            timeoutMs
        )
    }

    public async selectMenuOptionByText(optionText: string): Promise<void> {
        const optionElement = this.getElementByText(optionText);
        await optionElement.click();
    }

    public async isElementSelected(element: ReturnType<typeof $>): Promise<boolean> {
        const resolvedElement = await element
        const selectedAttribute = await resolvedElement.getAttribute('selected').catch(() => null)

        if (selectedAttribute !== null && selectedAttribute !== undefined) {
            return String(selectedAttribute).toLowerCase() === 'true'
        }

        return await resolvedElement.isSelected().catch(() => false)
    }

    /**
     * Ensures an accessibility-id element is selected. If not selected, clicks it and validates selected=true.
     */
    public async ensureAccessibilityElementSelected(
        accessibilityId: string,
        timeoutMs = this.DEFAULT_TIMEOUT
    ): Promise<boolean> {
        const selector = `~${accessibilityId}`
        const element = await $(selector)

        await element.waitForDisplayed({
            timeout: timeoutMs,
            timeoutMsg: `Element with accessibility id "${accessibilityId}" should be visible within ${timeoutMs / 1000} seconds`
        })

        const alreadySelected = await this.isElementSelected(element)

        if (!alreadySelected) {
            await element.click()
            await browser.waitUntil(async () => {
                const refreshedElement = await $(selector)
                return await this.isElementSelected(refreshedElement)
            }, {
                timeout: timeoutMs,
                interval: 300,
                timeoutMsg: `Element with accessibility id "${accessibilityId}" should be selected within ${timeoutMs / 1000} seconds`
            })
        }

        const finalElement = await $(selector)
        return await this.isElementSelected(finalElement)
    }
}

export default BasePage