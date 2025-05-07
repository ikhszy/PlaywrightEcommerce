import { expect, Locator, Page } from '@playwright/test'
import { baseHelper } from './baseHelper'

export class checkoutPage extends baseHelper {

    private readonly shippingTable: Locator
    private readonly paymentTable: Locator
    private readonly itemTable: Locator
    private readonly priceTable: Locator
    private readonly confirmBtn: Locator
    private readonly backBtn: Locator

    constructor(page: Page) {
        super(page)

        this.shippingTable = page.locator('[class="table confirm_shippment_options"]')
        this.paymentTable = page.locator('[class="table confirm_payment_options"]')
        this.itemTable = page.locator('[class="table confirm_products"]')
        this.priceTable = page.locator('[class="table table-striped table-bordered"]')
        this.confirmBtn = page.getByTitle('Confirm Order')
        this.backBtn = page.getByTitle('Back')
    }

    async chkGetShippingName() {
        return await this.shippingTable.locator('.align_left').nth(0).textContent()
    }

    async chkGetShippingAddress() {
        return await this.shippingTable.locator('.align_left').nth(1).textContent()
    }

    async chkGetShippingRate() {
        return await this.shippingTable.locator('.align_left').nth(2).textContent()
    }

    async chkGetShippingEdit() {
        await this.shippingTable.locator('.align_right').click()
    }

    async chkGetPaymentName() {
        return await this.paymentTable.locator('.align_left').nth(0).textContent()
    }

    async chkGetPaymentAddress() {
        return await this.paymentTable.locator('.align_left').nth(1).textContent()
    }

    async chkGetPaymentPay() {
        return await this.paymentTable.locator('.align_left').nth(2).textContent()
    }

    async chkPaymentEdit() {
        return await this.paymentTable.locator('[class="btn btn-default btn-xs"]').nth(0).textContent()
    }
    
    async chkPaymentEditCoupon() {
        return await this.paymentTable.locator('[class="btn btn-default btn-xs"]').nth(1).textContent()
    }

    async chkGetItemsName(item: number) {
        return await this.itemTable.locator('tr').nth(item).locator('td').nth(1).locator('a').textContent()
    }

    async chkGetItemsPrice(item: number) {
        return await this.itemTable.locator('tr').nth(item).locator('td').nth(2).textContent()
    }

    async chkGetItemsQty(item: number) {
        return await this.itemTable.locator('tr').nth(item).locator('td').nth(3).textContent()
    }

    async chkGetItemsTotalPrice(item: number) {
        return await this.itemTable.locator('tr').nth(item).locator('td').nth(4).textContent()
    }

    async chkBackBtn() {
        this.backBtn.click()
    }

    async chkConfirmBtn() {
        this.confirmBtn.click()
    }
}