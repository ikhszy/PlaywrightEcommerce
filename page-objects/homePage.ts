import { expect, Locator, Page, test } from '@playwright/test'
import { baseHelper } from './baseHelper'

export class homePage extends baseHelper {

    // reusable
    order: number
    price: number

    // items variable per section
    private readonly featuredItems: Locator
    private readonly latestItems: Locator
    private readonly bestItems: Locator
    private readonly specialItems: Locator

    // brands variable
    private readonly brands: Locator

    constructor(page: Page){
        super(page)

        // set the variables
        this.price = 0

        // section items locator
        this.featuredItems = page.locator('#featured [class="col-md-3 col-sm-6 col-xs-12"]')
        this.latestItems = page.locator('#latest [class="col-md-3 col-sm-6 col-xs-12"]')
        this.bestItems = page.locator('#bestseller [class="col-md-3 col-sm-6 col-xs-12"]')
        this.specialItems = page.locator('#special [class="col-md-3 col-sm-6 col-xs-12"]')
        this.brands = page.locator('#popularbrands .internal')
    }

    // featured items actions
    async featuredClickTitle(product: number) {
        await this.featuredItems.locator('.prdocutname').nth(product).click()
        
    }

    async featuredClickImage(product: number) {
        await this.featuredItems.locator('img').nth(product).click()
    }

    // return price of the product as string
    async featuredPrice(product: number) {
        const newprice = this.featuredItems.nth(product).locator('.pricenew')
        const oldprice = this.featuredItems.nth(product).locator('.priceold')
        const baseprice = this.featuredItems.nth(product).locator('.oneprice')
        
        if(await expect(newprice.isVisible).toBeTruthy) {
            let priceString = await newprice.textContent()
            // @ts-ignore (had to ignore since the string won't shown until we get it from the object)
            this.price = parseInt(priceString?.substring(1))
        } else {
            let priceString = await baseprice.nth(product).textContent()
            // @ts-ignore
            this.price = parseInt(priceString?.substring(1))
        }

        return this.price
    }

    // if product out of stock, return error
    async featuredAddtoCart(product: number) {
        const cartBtnExist = await this.featuredItems.nth(product).locator('.productcart')
        const cartOutStock = await this.featuredItems.nth(product).locator('.nostock')

        if(await expect(cartOutStock.isVisible).toBeTruthy) {
            console.log('cart button unavailable for the selected product')
            test.fail()
        } else {
           await cartBtnExist.click()
        }
    }

    async featuredViewClick(product: number) {
        const viewBtn = await this.featuredItems.nth(product).locator('.details')
        await viewBtn.click()
    }

    async featuredReviewClick(product: number) {
        const reviewBtn = await this.featuredItems.nth(product).locator('.compare')
        await reviewBtn.click()
    }

    // latest items actions
    async latestClickTitle(product: number) {
        await this.latestItems.locator('.prdocutname').nth(product).click()
        
    }

    async latestClickImage(product: number) {
        await this.latestItems.locator('img').nth(product).click()
    }

    // return price of the product as string
    async latestPrice(product: number) {
        const newprice = this.latestItems.nth(product).locator('.pricenew')
        const oldprice = this.latestItems.nth(product).locator('.priceold')
        const baseprice = this.latestItems.nth(product).locator('.oneprice')
        
        if(await expect(newprice.isVisible).toBeTruthy) {
            let priceString = await newprice.textContent()
            // @ts-ignore (had to ignore since the string won't shown until we get it from the object)
            this.price = parseInt(priceString?.substring(1))
        } else {
            let priceString = await baseprice.nth(product).textContent()
            // @ts-ignore
            this.price = parseInt(priceString?.substring(1))
        }

        return this.price
    }

    // if product out of stock, return error
    async latestAddtoCart(product: number) {
        const cartBtnExist = await this.latestItems.nth(product).locator('.productcart')
        const cartOutStock = await this.latestItems.nth(product).locator('.nostock')

        if(await expect(cartOutStock.isVisible).toBeTruthy) {
            console.log('cart button unavailable for the selected product')
            test.fail()
        } else {
           await cartBtnExist.click()
        }
    }

    async latestViewClick(product: number) {
        const viewBtn = await this.latestItems.nth(product).locator('.details')
        await viewBtn.click()
    }

    async latestReviewClick(product: number) {
        const reviewBtn = await this.latestItems.nth(product).locator('.compare')
        await reviewBtn.click()
    }

    // bestseller items actions
    async bestClickTitle(product: number) {
        await this.bestItems.locator('.prdocutname').nth(product).click()
        
    }

    async bestClickImage(product: number) {
        await this.bestItems.locator('img').nth(product).click()
    }

    // return price of the product as string
    async bestPrice(product: number) {
        const newprice = this.bestItems.nth(product).locator('.pricenew')
        const oldprice = this.bestItems.nth(product).locator('.priceold')
        const baseprice = this.bestItems.nth(product).locator('.oneprice')
        
        if(await expect(newprice.isVisible).toBeTruthy) {
            let priceString = await newprice.textContent()
            // @ts-ignore (had to ignore since the string won't shown until we get it from the object)
            this.price = parseInt(priceString?.substring(1))
        } else {
            let priceString = await baseprice.nth(product).textContent()
            // @ts-ignore
            this.price = parseInt(priceString?.substring(1))
        }

        return this.price
    }

    // if product out of stock, return error
    async bestAddtoCart(product: number) {
        const cartBtnExist = await this.bestItems.nth(product).locator('.productcart')
        const cartOutStock = await this.bestItems.nth(product).locator('.nostock')

        if(await expect(cartOutStock.isVisible).toBeTruthy) {
            console.log('cart button unavailable for the selected product')
            test.fail()
        } else {
           await cartBtnExist.click()
        }
    }

    async bestViewClick(product: number) {
        const viewBtn = await this.bestItems.nth(product).locator('.details')
        await viewBtn.click()
    }

    async bestReviewClick(product: number) {
        const reviewBtn = await this.bestItems.nth(product).locator('.compare')
        await reviewBtn.click()
    }

    // special items actions
    async specialClickTitle(product: number) {
        await this.specialItems.locator('.prdocutname').nth(product).click()
        
    }

    async specialClickImage(product: number) {
        await this.specialItems.locator('img').nth(product).click()
    }

    // return price of the product as string
    async specialPrice(product: number) {
        const newprice = this.specialItems.nth(product).locator('.pricenew')
        const oldprice = this.specialItems.nth(product).locator('.priceold')
        const baseprice = this.specialItems.nth(product).locator('.oneprice')
        
        if(await expect(newprice.isVisible).toBeTruthy) {
            let priceString = await newprice.textContent()
            // @ts-ignore (had to ignore since the string won't shown until we get it from the object)
            this.price = parseInt(priceString?.substring(1))
        } else {
            let priceString = await baseprice.nth(product).textContent()
            // @ts-ignore
            this.price = parseInt(priceString?.substring(1))
        }

        return this.price
    }

    // if product out of stock, return error
    async specialAddtoCart(product: number) {
        const cartBtnExist = await this.specialItems.nth(product).locator('.productcart')
        const cartOutStock = await this.specialItems.nth(product).locator('.nostock')

        if(await expect(cartOutStock.isVisible).toBeTruthy) {
            console.log('cart button unavailable for the selected product')
            test.fail()
        } else {
           await cartBtnExist.click()
        }
    }

    async specialViewClick(product: number) {
        const viewBtn = await this.specialItems.nth(product).locator('.details')
        await viewBtn.click()
    }

    async specialReviewClick(product: number) {
        const reviewBtn = await this.specialItems.nth(product).locator('.compare')
        await reviewBtn.click()
    }

    async brandClick(product: number) {
        await this.brands.nth(product).click()
    }
}