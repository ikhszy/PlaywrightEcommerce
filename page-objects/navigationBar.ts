import { Locator, Page } from '@playwright/test'

export class NavigationBar {
    
    readonly page: Page
    /*
    create constructor which expects page parameter to be passed inside of this class
    page (the blue one) is our fixture from Playwright
    then we assign it to the local field (this.page)
    'this' means we want to use a field/variable/property related only to this particular class 
    after that we can create method and use the page fixture inside the method 
    */

    selector: String

    // header navigation bar objects
    private readonly topLoginRegisterMenu: Locator
    private readonly topSpecialsMenu: Locator
    private readonly topAccountMenu: Locator
    private readonly topAccountLoginMenu: Locator
    private readonly topAccountOrderMenu: Locator
    private readonly topCartMenu: Locator
    private readonly topCheckoutMenu: Locator
    private readonly searchBox: Locator

    // page list menu 
    private readonly homeBarMenu: Locator
    private readonly apparelBarMenu: Locator
    private readonly makeupBarMenu: Locator
    private readonly skincareBarMenu: Locator
    private readonly fragranceBarMenu: Locator
    private readonly menBarMenu: Locator
    private readonly haircareBarMenu: Locator
    private readonly booksBarMenu: Locator

    // language and cart
    
    private readonly cartBar: Locator
    private readonly currencyBar: Locator

    constructor(page: Page) {
        this.page = page
        
        // top navigation bar
        this.topLoginRegisterMenu = page.locator('#customer_menu_top')
        this.topSpecialsMenu = page.locator('[data-id="menu_specials"]').nth(0)
        this.topAccountMenu = page.locator('[data-id="menu_account"]').nth(0)
        this.topAccountLoginMenu = page.locator('[data-id="menu_login"]').nth(0)
        this.topAccountOrderMenu = page.locator('[data-id="menu_order"]').nth(0)
        this.topCartMenu = page.locator('[data-id="menu_cart"]').nth(0)
        this.topCheckoutMenu = page.locator('[data-id="menu_checkout"]').nth(0)
        this.searchBox = page.locator('#filter_keyword')

        // page list locator
        this.homeBarMenu = page.locator('[class="active menu_home"]')
        this.apparelBarMenu = page.locator('#categorymenu').getByRole('link', { name: 'Apparel & accessories' })
        this.makeupBarMenu = page.locator('#categorymenu').getByRole('link', { name: 'Makeup' })
        this.skincareBarMenu = page.locator('#categorymenu').getByRole('link', { name: 'Skincare' })
        this.fragranceBarMenu = page.locator('#categorymenu').getByRole('link', { name: 'Fragrance' })
        this.menBarMenu = page.locator('#categorymenu').getByRole('link', { name: 'Men' })
        this.haircareBarMenu = page.locator('#categorymenu').getByRole('link', { name: 'Hair Care' })
        this.booksBarMenu = page.locator('#categorymenu').getByRole('link', { name: 'Books' })

        // currency and cart locator
        this.currencyBar = page.locator('[class="dropdown-menu currency"]')
        this.cartBar = page.locator('.cart_total')

    }

    // starting here is for header navigation method
    async topLoginRegisterBtn() {
        await this.topLoginRegisterMenu.click()
    }

    async topSpecialsBtn() {
        await this.topSpecialsMenu.click()
    }

    async topCartBtn() {
        await this.topCartMenu.click()
    }

    async topCheckoutBtn() {
        await this.topCheckoutMenu.click()
    }

    // fill with 'login' or 'order'
    async topAccountBtn(selection: string){

        // click on dropdown first
        await this.topAccountMenu.click()

        // use if-else to determine which menu to choose
        if(selection == 'login') {
            await this.topAccountLoginMenu.click()
        } else if(selection == 'order') {
            await this.topAccountOrderMenu.click()
        }
    }

    async searchBar(search: string) {
        await this.searchBox.fill(search)
        await this.page.keyboard.press('Enter')
    }

    async homeBar(){
        await this.homeBarMenu.click()
    }

    // selection value must match one of the value inside arr
    async homeBarSelection(selection: string){
        // hover on the parent object first
        await this.homeBarMenu.hover()

        let arr = ['Specials', 'Account', 'Cart', 'Checkout']
        
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].includes(selection)) {
                await this.page.locator('#categorymenu').getByRole('link', { name: arr[i] }).click()
            }
        }
    }

    async apparelBar(){
        await this.apparelBarMenu.click()
    }

    // selection value must match one of the value inside arr
    async apparelBarSelection(selection: string){
        // hover on the parent object to enable the click state of the childs
        await this.apparelBarMenu.hover()
        
        let arr = ['Shoes', 'T-Shirts']
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].includes(selection)) {
                await this.page.locator('#categorymenu').getByRole('link', { name: arr[i] }).click()
            }
        }
    }

    async makeupBar() {
        await this.makeupBarMenu.click()
    }

    // selection value must match one of the value inside arr
    async makeupBarSelection(selection: string) {
        await this.makeupBarMenu.hover()

        let arr = ['Cheeks', 'Eyes', 'Face', 'Lips', 'Nails', 'Value Sets']
        
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].includes(selection)){
                await this.page.locator('#categorymenu').getByRole('link', { name: arr[i] }).click()
            }
        }
    }

    async skincareBar() {
        await this.skincareBarMenu.click()
    }

    async skincareBarSelection(selection: string) {
        await this.skincareBarMenu.hover()

        let arr = ['Eyes', 'Face', 'Gift Ideas & Sets', 'Hands & Nails', 'Sun']

        for(let i = 0; i < arr.length; i++) {
            if(arr[i].includes(selection)){
                await this.page.locator('#categorymenu').getByRole('link', { name: arr[i] }).click()
            }
        }
    }

    async fragranceBar() {
        await this.fragranceBarMenu.click()
    }

    async fragranceBarSelection(selection: string) {
        await this.fragranceBarMenu.hover()

        let arr = ['Men', 'Women']

        for(let i = 0; i < arr.length; i++) {
            if(arr[i].includes(selection)){
                await this.page.locator('#categorymenu').getByRole('link', { name: arr[i] }).click()
            }
        }
    }

    async haircareBar() {
        await this.haircareBarMenu.click()
    }

    async haircareBarSelection(selection: string) {
        await this.haircareBarMenu.hover()

        let arr = ['Conditioner', 'Shampoo']

        for(let i = 0; i < arr.length; i++) {
            if(arr[i].includes(selection)){
                await this.page.locator('#categorymenu').getByRole('link', { name: arr[i] }).click()
            }
        }
    }

    async booksBar() {
        await this.booksBarMenu.click()
    }

    async booksBarSelection(selection: string) {
        await this.booksBarMenu.hover()

        let arr = ['Audio CD', 'Paperback']

        for(let i = 0; i < arr.length; i++) {
            if(arr[i].includes(selection)){
                await this.page.locator('#categorymenu').getByRole('link', { name: arr[i] }).click()
            }
        }
    }

    // 0 for Euro, 1 for Poundsterling, 2 for Dollar
    async currencySelector(select: number) {
        this.currencyBar.locator('li').nth(select).click()
    }

    async cartBarTotalPrice() {
        let price = this.cartBar.textContent()
        // @ts-ignore
        price.replace('$','')
        // @ts-ignore
        return parseFloat(price)
    }
}