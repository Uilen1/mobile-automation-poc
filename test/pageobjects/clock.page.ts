import { $ } from '@wdio/globals'

/**
 * Page Object for Clock Application
 * Contains all selectors and methods for interacting with the Clock app
 */
class ClockPage {
    // Timeout constants for better maintainability
    private readonly DEFAULT_TIMEOUT = 10000
    private readonly EXTENDED_TIMEOUT = 15000

    // Selectors for clock app elements
    private get timeDisplay() {
        return $('//android.widget.TextView[@resource-id="com.google.android.deskclock:id/digital_clock"]')
    }

    private get clockTab() {
        return $('//android.widget.TextView[@text="Clock"]')
    }

    private get alarmTab() {
        return $('~Alarm')
    }

    private get addAlarmButton() {
        return $('~Add alarm')
    }

    private get amButton() {
        return $('//android.widget.CompoundButton[@text="AM"]')
    }

    private get tenOClock() {
        return $('~10 o\'clock')
    }

    private get fiftyFiveMinutes() {
        return $('~55 minutes')
    }

    private get okButton() {
        return $('//android.widget.Button[@text="OK"]')
    }

    private get alarmTimeDisplay() {
        return $('~10:55 AM')
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

    /**
     * Gets the displayed time text
     * @returns Promise<string> - The time text displayed
     */
    public async getDisplayedTime(): Promise<string> {
        await this.timeDisplay.waitForDisplayed({
            timeout: this.DEFAULT_TIMEOUT,
            timeoutMsg: 'Time display should be visible within 10 seconds'
        })
        return await this.timeDisplay.getText()
    }

    /**
     * Clicks on the Clock tab
     */
    public async clickClockTab(): Promise<void> {
        await this.clockTab.waitForDisplayed({
            timeout: this.DEFAULT_TIMEOUT,
            timeoutMsg: 'Clock tab should be displayed within 10 seconds'
        })
        await this.clockTab.click()
    }

    /**
     * Clicks on the Alarm tab
     */
    public async clickAlarmTab(): Promise<void> {
        await this.alarmTab.waitForDisplayed({
            timeout: this.DEFAULT_TIMEOUT,
            timeoutMsg: 'Alarm tab should be displayed within 10 seconds'
        })
        await this.alarmTab.click()
    }

    /**
     * Clicks on the Add Alarm button
     */
    public async clickAddAlarm(): Promise<void> {
        await this.addAlarmButton.waitForDisplayed({
            timeout: this.DEFAULT_TIMEOUT,
            timeoutMsg: 'Add alarm button should be displayed within 10 seconds'
        })
        await this.addAlarmButton.click()
    }

    /**
     * Selects AM option
     */
    public async selectAM(): Promise<void> {
        await this.amButton.waitForDisplayed({
            timeout: this.DEFAULT_TIMEOUT,
            timeoutMsg: 'AM button should be displayed within 10 seconds'
        })
        await this.amButton.click()
    }

    /**
     * Selects 10 o'clock option
     */
    public async selectTenOClock(): Promise<void> {
        await this.tenOClock.waitForDisplayed({
            timeout: this.DEFAULT_TIMEOUT,
            timeoutMsg: '10 o\'clock option should be displayed within 10 seconds'
        })
        await this.tenOClock.click()
    }

    /**
     * Selects 55 minutes option
     */
    public async selectFiftyFiveMinutes(): Promise<void> {
        await this.fiftyFiveMinutes.waitForDisplayed({
            timeout: this.DEFAULT_TIMEOUT,
            timeoutMsg: '55 minutes option should be displayed within 10 seconds'
        })
        await this.fiftyFiveMinutes.click()
    }

    /**
     * Clicks on the OK button to save
     */
    public async clickOK(): Promise<void> {
        await this.okButton.waitForDisplayed({
            timeout: this.DEFAULT_TIMEOUT,
            timeoutMsg: 'OK button should be displayed within 10 seconds'
        })
        await this.okButton.click()
    }

    /**
     * Checks if the alarm is set to 10:55 AM
     * @returns Promise<boolean> - True if alarm is displayed
     */
    public async isAlarmSetToTenFiftyFiveAM(): Promise<boolean> {
        return await this.alarmTimeDisplay.waitForDisplayed({
            timeout: this.EXTENDED_TIMEOUT,
            timeoutMsg: '10:55 AM alarm should be displayed within 15 seconds'
        })
    }
}

export default new ClockPage()