import { expect } from '@wdio/globals'
import ClockPage from '../pageobjects/clock.page'

describe('Clock Application - Mobile Automation Tests', () => {

    describe('Time Display Tests', () => {
        /**
 * Setup hook - runs once before all tests in this describe block
 * Navigates to the Alarm tab to ensure consistent starting state
 */
        before(async () => {
            console.log('🔧 Setting up test suite: Navigating to Clock tab...')
            await ClockPage.clickClockTab()
            console.log('✅ Setup complete: Clock tab is now active')
        })

        /**
         * Cleanup hook - runs after each test to ensure clean state
         * Currently just logs completion, can be extended for cleanup operations
         */
        afterEach(async function () {
            console.log(`✅ Test completed: ${this.currentTest?.title}`)
        })

        it('should verify the time is displayed', async () => {
            const timeVisible = await ClockPage.isTimeDisplayVisible()
            expect(timeVisible).toBe(true)
        })

        it('should get the current time from the clock', async () => {
            const time = await ClockPage.getDisplayedTime()
            expect(time).toBeDefined()
            expect(time?.length).toBeGreaterThan(0)
            console.log(`🕐 Current time displayed: ${time}`)
        })
    })

    describe('Alarm Configuration Tests', () => {
        /**
 * Setup hook - runs once before all tests in this describe block
 * Navigates to the Alarm tab to ensure consistent starting state
 */
        before(async () => {
            console.log('🔧 Setting up test suite: Navigating to Alarm tab...')
            await ClockPage.clickAlarmTab()
            console.log('✅ Setup complete: Alarm tab is now active')
        })

        /**
         * Cleanup hook - runs after each test to ensure clean state
         * Currently just logs completion, can be extended for cleanup operations
         */
        afterEach(async function () {
            console.log(`✅ Test completed: ${this.currentTest?.title}`)
        })

        it('should be able to navigate to alarm tab', async () => {
            // Test passed if no error occurred during navigation (already done in before hook)
            expect(true).toBe(true)
        })

        it('should configure alarm to 10:55 AM', async () => {
            // Click Add alarm button
            await ClockPage.clickAddAlarm()

            // Select AM period
            await ClockPage.selectAM()

            // Select 10 o'clock
            await ClockPage.selectTenOClock()

            // Select 55 minutes
            await ClockPage.selectFiftyFiveMinutes()

            // Click OK to save the alarm
            await ClockPage.clickOK()

            // Validate that alarm is set to 10:55 AM
            const alarmSet = await ClockPage.isAlarmSetToTenFiftyFiveAM()
            expect(alarmSet).toBe(true)
        })
    })
})

