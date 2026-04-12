import { expect } from '@wdio/globals'
import GooglePage from '../pageobjects/google.page'

describe('Google Search - Chrome Browser Tests', () => {
    before(async () => {
        console.log('🔧 Setting up Chrome test suite...')
        await GooglePage.open()
        console.log('✅ Setup complete: Google page loaded')
    })

    afterEach(async function () {
        console.log(`✅ Test completed: ${this.currentTest?.title}`)
    })

    it('should load Google homepage', async () => {
        const title = await browser.getTitle()
        expect(title).toContain('Google')
    })

    it('should perform a search and display results', async () => {
        await GooglePage.searchFor('WebDriverIO')
        await browser.pause(2000) // Wait for results to load
        const title = await browser.getTitle()
        expect(title).toContain('WebDriverIO')
    })
})