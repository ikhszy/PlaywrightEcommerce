import { expect, Locator, Page } from '@playwright/test'
import { baseHelper } from './baseHelper'
import { count } from 'console'
import { subtle } from 'crypto'

export class cartPage extends baseHelper {

    // item table variable
    private readonly cartTable: Locator
    private readonly couponText: Locator
    private readonly couponBtn: Locator
    private readonly countrySelect: Locator
    private readonly stateSelect: Locator
    private readonly zipText: Locator
    private readonly estimateBtn: Locator
    private readonly shipmentSelect: Locator
    private readonly totalTable: Locator
    private readonly checkoutBtn: Locator

    constructor(page: Page) {
        super(page)

        // item locator
        this.cartTable = page.locator('#cart tr')
        this.couponText = page.locator('#coupon_coupon')
        this.couponBtn = page.locator('#apply_coupon_btn')
        this.countrySelect = page.locator('#estimate_country')
        this.stateSelect = page.locator('#estimate_country_zones')
        this.zipText = page.locator('#estimate_postcode')
        this.estimateBtn = page.getByTitle('Estimate')
        this.shipmentSelect = page.locator('#shippings')
        this.totalTable = page.locator('#totals_table tr')
        this.checkoutBtn = page.locator('#cart_checkout2')
    }

    async cartTotalItems() {
        const totalItems = this.page.locator('#cart [class="table table-striped table-bordered"] tr')
        return await totalItems.count() - 1
    }

    // start with 1 as first item
    async cartNameGet(item: number) {
        const cartTblName = this.cartTable.nth(item).locator('.align_left').first()
        return cartTblName.textContent()
    }

    // start with 1 as first item
    async cartTotalGet(item: number) {
        const cartTblPrice = await this.cartTable.nth(item).locator('.align_right').nth(1)
        let priceStr = await cartTblPrice.textContent()
        //@ts-ignore
        priceStr = priceStr?.replaceAll('$', '')
        //@ts-ignore
        return parseFloat(priceStr);
    }

    // start with 0 as first item
    async cartQtyUpdate(item: number, qty: number) {
        const cartQty = this.page.locator('[class="form-control short"]').nth(item)
        await cartQty.clear()
        await cartQty.fill(qty.toString())
        await this.page.locator('#cart_update').click()
    }

    // start with 0 as first item
    async cartRemove(item: number) {
        const cartRemove = this.page.locator('[class="btn btn-sm btn-default"]').nth(item)
        await cartRemove.click()
    }

    // apply coupon
    async cartCoupon(coupon: string) {
        await this.couponText.fill(coupon)
        await this.couponBtn.click()
    }
    
    async cartCountrySelect(country: string) {
        await this.countrySelect.selectOption({label: country})
    }

    async cartStateSelect(state: string) {
        await this.stateSelect.selectOption({label: state})
    }

    async cartZipFill(zip: string) {
        await this.zipText.fill(zip)
    }

    async cartEstimateClick() {
        await this.estimateBtn.click()
    }

    async cartShipmentSelect(shipment: number) {
        await this.shipmentSelect.selectOption({index: shipment})
    }

    async cartGetSubtotal() {
        let subTotal = await this.totalTable.first().locator('td').nth(1).textContent()
        //@ts-ignore
        subTotal = subTotal?.replaceAll('$','')
        //@ts-ignore
        return parseFloat(subTotal)
    }

    async cartGetShipRate() {
        let shiprate = await this.totalTable.nth(1).locator('td').nth(1).textContent()
        //@ts-ignore
        shiprate = shiprate?.replaceAll('$','')
        //@ts-ignore
        return parseFloat(shiprate)
    }

    async cartGetRetail() {
        let retail = await this.totalTable.nth(2).locator('td').nth(1).textContent()
        //@ts-ignore
        retail = retail?.replaceAll('$','')
        //@ts-ignore
        return parseFloat(retail)
    }

    async cartGetTotalPrice() {
        let total = await this.page.locator('[class="bold totalamout"]').textContent()
        //@ts-ignore
        total = total?.replaceAll('$','')
        //@ts-ignore
        return parseFloat(total)
    }

    async cartCheckoutClick() {
        await this.checkoutBtn.click()
    }
}