import { test, expect } from '@playwright/test'
import { pageManager } from '../page-objects/pageManager'
import { baseHelper } from '../page-objects/baseHelper'

test.beforeEach('go to page', async({page}) => {
    const pm = new pageManager(page)
    const bh = new baseHelper(page)

    // login
    await page.goto('https://automationteststore.com/')
    await pm.nav().topLoginRegisterBtn()
    bh.getLoginDataJson()
    await pm.lgn().loginnameInput(bh.loginname)
    await pm.lgn().loginpasswordInput(bh.password)
    await pm.lgn().loginBtnClick()

    // add item
    await pm.nav().apparelBarSelection('Shoes')
    await pm.item().categoryNameClick(0)
    await pm.item().itemRadioClick(2)
    await pm.item().itemComboSelect('red')
    let qty = 5
    await pm.item().itemQtyFill(qty)
    await pm.item().itemCartClick()

    // cart
    await pm.cart().cartQtyUpdate(0,10)
    await pm.cart().cartCountrySelect('United States')
    await pm.cart().cartStateSelect('Arizona')
    await pm.cart().cartZipFill('95551')
    await pm.cart().cartShipmentSelect(0)
    await pm.cart().cartCheckoutClick()
})

test('Success order', async ({page}) => {
    const pm = new pageManager(page)
    const bh = new baseHelper(page)

    // just confirm it i'm too lazy today to do anything
    await pm.checkout().chkConfirmBtn()

    await page.waitForTimeout(3000)

    let url = await page.url()
    await expect(url).toContain('checkout/success')
    await expect(page.locator('body')).toContainText('Your Order Has Been Processed!')
})

