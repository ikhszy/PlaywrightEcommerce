import { expect, Locator, Page } from '@playwright/test'
import { baseHelper } from './baseHelper'

export class cartPage extends baseHelper {

    // item table variable
    private readonly cartTable: Locator
    private readonly cartTblHeader: Locator
    private readonly cartTblImg: Locator
    private readonly cartTblName: Locator
    private readonly cartTblModel: Locator
    private readonly cartTblPrice: Locator
    private readonly cartTblQty: Locator
    private readonly cartTblTotal: Locator
    private readonly cartTblRemove: Locator

    constructor(page: Page) {
        super(page)

        // item table locator
        this.cartTable = page.locator('#top_cart_product_list')
    }

    async cartTotalItems() {
        const totalItems = this.cartTable.locator('.image')
        return await totalItems.count()
    }

    async cartNameGet(item: number) {
        const cartTblName = this.cartTable.locator('.name a').nth(item)
        return await cartTblName.textContent()
    }

    async cartTotalGet(item: number) {
        const cartTblPrice = await this.cartTable.locator('.total')
        let priceStr = await cartTblPrice.textContent()
        //@ts-ignore
        priceStr = priceStr?.replaceAll('$', '')
        //@ts-ignore
        return parseFloat(priceStr);
    }

    async cartQtyUpdate(item: number, qty: number) {
        const cartQty = this.page.locator('[class="form-control short"]').nth(item)
        await cartQty.clear()
        await cartQty.fill(qty.toString())
        await this.page.locator('#cart_update').click()
    }

    async cartRemove(item: number) {
        const cartRemove = this.page.locator('[class="btn btn-sm btn-default"]').nth(item)
        await cartRemove.click()
    }
}