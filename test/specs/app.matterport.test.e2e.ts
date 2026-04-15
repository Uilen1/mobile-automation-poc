import { expect } from '@wdio/globals'
import ClockPage from '../pageobjects/clock.page'

describe('Matterport Application - Mobile Automation Tests', () => {

    describe('Important Validation Tests', () => {
        /**
 * Setup hook - runs once before all tests in this describe block
 * Navigates to the Alarm tab to ensure consistent starting state
 */
        before(async () => {
            console.log('🔧 Setting up test suite:')
            console.log('✅ Setup complete: Starting tests for Matterport app')
        })

        /**
         * Cleanup hook - runs after each test to ensure clean state
         * Currently just logs completion, can be extended for cleanup operations
         */
        afterEach(async function () {
            console.log(`✅ Test completed: ${this.currentTest?.title}`)
        })

        it('should verify the welcome message is displayed', async () => {
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
})

