import { test, expect } from '@playwright/test'
import { pageManager } from '../page-objects/pageManager'
import { baseHelper } from '../page-objects/baseHelper'
import { cartPage } from '../page-objects/cartPage'

test.beforeEach(async({page}) => {
    await page.goto('https://automationteststore.com/', {timeout: 60000})
})

test.describe('Items Page Testing', ()=> {
    test('Add items without options', async({page}) => {
        const pm = new pageManager(page)
        const bh = new baseHelper(page)
    
        // click the 1st featured item
        await pm.home().featuredClickTitle(0)
        
        // set the quantity of the item
        let qty = 5
        await pm.item().itemQtyFill(qty)

        // get the item name
        let itemName = await pm.item().itemGetName()
        
        // get both item base price and total after quantity
        let basePrice = await pm.item().itemGetBasePrice()
        await bh.waitForSeconds(2)
        let totalPrice = await pm.item().itemGetTotalPrice()
        
        // assert the total is correct
        expect(totalPrice).toEqual(basePrice * qty)

        // add the item to cart
        await pm.item().itemCartClick()

        // check on cart bar that the item is added
        let itemNameVs = await pm.cart().cartNameGet(0)
        await expect (itemName).toContain(itemNameVs)

        // check the cart bar price's
        let itemcartprice = await pm.cart().cartTotalGet(0)
        await expect(itemcartprice * qty).toEqual(totalPrice)

    })

    test('Add items with radio and select options', async({page}) => {
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

        // add to cart
        await pm.item().itemCartClick()
    })
})