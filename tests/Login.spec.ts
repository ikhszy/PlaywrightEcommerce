import { test, expect } from '@playwright/test'
import { pageManager } from '../page-objects/pageManager'
import { baseHelper } from '../page-objects/baseHelper'

test.beforeEach(async({page}) => {
    const pm = new pageManager(page)
    await page.goto('https://automationteststore.com/', {timeout: 60000})
    await pm.nav().topLoginRegisterBtn()
})

test.describe('Login test suite', () => {
    test('Success login', async({page}) => {
        const pm = new pageManager(page)
        const bh = new baseHelper(page)
        
        // assign username and password to variables based on Json data
        bh.getLoginDataJson()

        // fill username and password
        await pm.lgn().loginnameInput(bh.loginname)
        await pm.lgn().loginpasswordInput(bh.password)
        await pm.lgn().loginBtnClick()
    })

    test('failed login - wrong password', async({page}) => {
        const pm = new pageManager(page)
        const bh = new baseHelper(page)

        // assign username and password to variables based on Json data
        bh.getLoginDataJson()

        // fill username and password
        await pm.lgn().loginnameInput(bh.loginname)
        await pm.lgn().loginpasswordInput('wrongpassword123')
        await pm.lgn().loginBtnClick()

        // assert error message
        let errtext = await pm.lgn().regErrAlertGetText()
        expect(errtext).toContain('Error: Incorrect login or password provided.')
        expect(await pm.lgn().regErrAlertVisible()).toBeTruthy()
    })

    test('forgot password - success', async({page}) => {
        const pm = new pageManager(page)
        const bh = new baseHelper(page)

        // get data from json
        await bh.getRegisterDataJSON()

        // go to forgot password page
        await pm.lgn().forgotPassClick()

        // fill the form
        await pm.forgot().forgotLoginnameFill(bh.loginname)
        await pm.forgot().forgotEmailFill(bh.email)

        // click the continue button
        await pm.forgot().forgotContinueClick()

        // assert the alert
        let scsText = await pm.lgn().regScsAlertGetText()
        expect(scsText).toContain('Success: Password reset link has been sent to your e-mail address.')
        expect(await pm.lgn().regScsAlertVisible()).toBeTruthy()
    })

    test('forgot loginname - success', async({page}) => {
        const pm = new pageManager(page)
        const bh = new baseHelper(page)

        // get data from json
        await bh.getRegisterDataJSON()

        // go to forgot login page
        await pm.lgn().forgotLoginClick()

        // fill the form
        await pm.forgot().forgotLastnameFill(bh.lastname)
        await pm.forgot().forgotEmailFill(bh.email)

        // click the continue button
        await pm.forgot().forgotContinueClick()

        // assert the success message
        let scsText = await pm.lgn().regScsAlertGetText()
        expect(scsText).toContain('Success: Your login name reminder has been sent to your e-mail address.')
        expect(await pm.lgn().regScsAlertVisible()).toBeTruthy()
    })
})