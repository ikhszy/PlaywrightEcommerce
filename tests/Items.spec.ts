import { test, expect } from '@playwright/test'
import { pageManager } from '../page-objects/pageManager'
import { baseHelper } from '../page-objects/baseHelper'

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

        // add to Cart
        await pm.item().itemCartClick()

        // check on cart bar that the item is added
        let itemNameVs = await pm.cart().cartNameGet(1)
        await expect (itemName).toContain(itemNameVs)

        // check the cart bar price's
        let itemcartprice = await pm.cart().cartTotalGet(1)
        await expect(itemcartprice * qty).toEqual(totalPrice)
    })

    test('add items from json file', async({page}) => {
        const pm = new pageManager(page)
        const bh = new baseHelper(page)

        // initialize test data
        const shoesData = JSON.parse(JSON.stringify(require('../test-data/productsList.json')))

        // search for product
        await pm.nav().searchBar(shoesData.Shoes[1].name)

        // set the selection
        await pm.item().itemComboSelect(shoesData.Shoes[1].size)

        // let's compare price
        let jsonprice = (shoesData.Shoes[1].price).replaceAll('$','')
        expect(await pm.item().itemGetBasePrice()).toEqual(parseFloat(jsonprice))
    })

    test('getting data from excel sheets', async({page}) => {
        const pm = new pageManager(page)
        const bh = new baseHelper(page)

        // set the test data
        let itemname = await bh.getItemExcel(2, 1) // --> get shirts name

        // search using the item name
        //@ts-ignore
        await pm.nav().searchBar(itemname)
    })
})