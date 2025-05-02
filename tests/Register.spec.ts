import { test, expect } from '@playwright/test'
import { pageManager } from '../page-objects/pageManager'
import { baseHelper } from '../page-objects/baseHelper'

test.beforeEach(async({page}) => {
    await page.goto('https://automationteststore.com/')
    const pm = new pageManager(page)
    // go to login register page
    await pm.nav().topLoginRegisterBtn()
})

test.describe('Register function test suite', () => {
    test('Register Success', async({page}) => {
        const pm = new pageManager(page)
        const bh = new baseHelper(page)
    
        // open registration form
        await pm.lgn().continueBtnClick()
        await page.waitForTimeout(2000)
    
        // generate test data from baseHelper
        bh.generateRegisterData()
    
        // filling the form
        await pm.lgn().regFirstName(bh.firstname)
        await pm.lgn().regLastName(bh.lastname)
        await pm.lgn().regEmail(bh.email)
        await pm.lgn().regTelephone(bh.phone)
        await pm.lgn().regCompany(bh.company)
        await pm.lgn().regAddress1(bh.address1)
        await pm.lgn().regCity(bh.city)
        await pm.lgn().regZipcode(bh.zipcode)
        await pm.lgn().regCountrySelect(bh.country)
        await pm.lgn().regStateSelect(bh.state)
        await pm.lgn().regLoginname(bh.loginname)
        await pm.lgn().regPassword(bh.password)
        await pm.lgn().regPasswordConfirm(bh.password)
        await pm.lgn().regSubscribe(0)
        await pm.lgn().regPrivacyCheck()
        await pm.lgn().continueBtnClick()
    })

    test('Register failed - firstname empty', async({page}) => {
        const pm = new pageManager(page)
        const bh = new baseHelper(page)

        // open registration form
        await pm.lgn().continueBtnClick()
        await page.waitForTimeout(2000)
    
        // generate test data from baseHelper
        bh.generateRegisterData()
    
        // filling the form
        await pm.lgn().regLastName(bh.lastname)
        await pm.lgn().regEmail(bh.email)
        await pm.lgn().regTelephone(bh.phone)
        await pm.lgn().regCompany(bh.company)
        await pm.lgn().regAddress1(bh.address1)
        await pm.lgn().regCity(bh.city)
        await pm.lgn().regZipcode(bh.zipcode)
        await pm.lgn().regCountrySelect(bh.country)
        await pm.lgn().regStateSelect(bh.state)
        await pm.lgn().regLoginname(bh.loginname)
        await pm.lgn().regPassword(bh.password)
        await pm.lgn().regPasswordConfirm(bh.password)
        await pm.lgn().regSubscribe(0)
        await pm.lgn().regPrivacyCheck()
        await pm.lgn().continueBtnClick()

        await page.waitForTimeout(2000)

        // assert the error
        await expect(pm.lgn().alertErrorRegister).toBeVisible()
        await expect(pm.lgn().alertErrorRegister).toContainText('First Name must be between 1 and 32 characters!')
    })
})