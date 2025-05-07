import { test, expect } from '@playwright/test'
import { pageManager } from '../page-objects/pageManager'
import { baseHelper } from '../page-objects/baseHelper'

test.beforeEach(async({page}) => {
    await page.goto('https://automationteststore.com/', {timeout: 60000})
})

test.describe('Cart page testing', ()=> {
    test('cart page success', async({page}) => {
        const pm = new pageManager(page)
        const bh = new baseHelper(page)
    
        // go to shoes page
        await pm.nav().apparelBarSelection('Shoes')

        // select the first item
        await pm.item().categoryNameClick(0)
        
        // select size (radio)
        await pm.item().itemRadioClick(2)

        // select colour (comboBox)
        await pm.item().itemComboSelect('red')

        // set the quantity of the item
        let qty = 5
        await pm.item().itemQtyFill(qty)

        await page.waitForTimeout(3000)
 
        // get the item name
        let itemName = await pm.item().itemGetName()
         
        // get both item base price and total after quantity
        const basePrice = await pm.item().itemGetBasePrice()
        let totalPrice = await pm.item().itemGetTotalPrice()
         
        // assert the total is correct
        expect(totalPrice).toEqual(basePrice * qty)

        // add to Cart
        await pm.item().itemCartClick()

        // check on cart bar that the item is added
        let itemNameVs = await pm.cart().cartNameGet(1)
        await expect (itemNameVs).toContain(itemName)

        // check the cart bar price's
    let itemcartprice = await pm.cart().cartTotalGet(1)
    await expect(itemcartprice).toEqual(totalPrice)

    // update quantity of the item
    await pm.cart().cartQtyUpdate(0,10)

    // assert total is correct
    await expect(basePrice * 10).toEqual(await pm.cart().cartTotalGet(1))

    // set shipment
    await pm.cart().cartCountrySelect('United States')
    await pm.cart().cartStateSelect('Arizona')
    await pm.cart().cartZipFill('95551')
    await pm.cart().cartShipmentSelect(0)

    // check total price table
    let subtotal = await pm.cart().cartGetSubtotal()
    let shiprate = await pm.cart().cartGetShipRate()
    let retail = await pm.cart().cartGetRetail()
    let total = await pm.cart().cartGetTotalPrice()

    await expect(retail).toEqual(subtotal * 0.085)
    await expect(total).toEqual(subtotal + shiprate + retail)
    })
})