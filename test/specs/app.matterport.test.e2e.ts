import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/matterportPages/login.page'
import ProjectsPage from '../pageobjects/matterportPages/projects.page'



describe('Matterport Application - Mobile Automation Tests', () => {

    describe('Important Validation Tests', () => {
        /**
 * Setup hook - runs once before all tests in this describe block
 * Navigates to the Alarm tab to ensure consistent starting state
 */
        before(async () => {
            console.log('🔧 Setting up test suite:')
            await LoginPage.login('lellesmoreira9@gmail.com');
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
            const projectsOptionSelected = await ProjectsPage.ensureProjectsOptionSelected()
            expect(projectsOptionSelected).toBe(true)
            await ProjectsPage.firstAccessValidation()
        })
    })
})

