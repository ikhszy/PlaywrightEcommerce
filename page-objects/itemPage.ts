import { expect, Locator, Page, test } from '@playwright/test'
import { baseHelper } from './baseHelper'

export class itemPage extends baseHelper {

    textTarget: string
    numTarget: number

    // category page
    private readonly categoryItemBase: Locator

    // item page
    private readonly itemHomeBreadcrumb: Locator
    private readonly itemBreadcrumb: Locator
    private readonly itemName: Locator
    private readonly itemPrice: Locator
    private readonly itemQty: Locator
    private readonly itemTotalPrice: Locator
    private readonly itemAddCart: Locator
    private readonly itemPrint: Locator
    private readonly itemImg: Locator
    private readonly itemDescTab: Locator
    private readonly itemReviewTab: Locator
    private readonly itemTagsTab: Locator
    private readonly itemDescText: Locator
    private readonly itemDescModel: Locator
    private readonly itemDescManufacturer: Locator
    private readonly itemRevRating: Locator
    private readonly itemRevName: Locator
    private readonly itemRevReview: Locator // delete later, create method directly with id
    private readonly itemRevCaptcha: Locator
    private readonly itemRevCaptchaText: Locator
    private readonly itemRevCaptchaBtn: Locator
    private readonly itemTagstag: Locator
    private readonly itemOptions: Locator
    
    constructor(page: Page) {
        super(page)

        // category objects locator
        this.categoryItemBase = page.locator('#maincontainer [class="col-md-3 col-sm-6 col-xs-12"]')

        this.itemHomeBreadcrumb = page.locator('.breadcrumbs li').nth(0)
        this.itemBreadcrumb = page.locator('.breadcrumbs li').nth(1)
        this.itemName = page.locator('.bgnone')
        this.itemPrice = page.locator('.productfilneprice')
        this.itemQty = page.locator('#product_quantity')
        this.itemTotalPrice = page.locator('.total-price')
        this.itemAddCart = page.locator('.cart')
        this.itemPrint = page.locator('[class="productprint btn btn-large"]')
        this.itemImg = page.locator('a.local_image img')
        this.itemDescTab = page.locator('[href="#description"]')
        this.itemReviewTab = page.locator('[href="#review"]')
        this.itemTagsTab = page.locator('[href="#producttag"]')
        this.itemDescText = page.locator('#description p')
        this.itemDescModel = page.locator('.productinfoleft').nth(0)
        this.itemDescManufacturer = page.locator('.productinfoleft img').nth(1)
        this.itemRevName = page.locator('#name')
        this.itemRevReview = page.locator('#text') 
        this.itemRevCaptcha = page.locator('#captcha_img')
        this.itemRevCaptchaText = page.locator('#captcha')
        this.itemRevCaptchaBtn = page.locator('#review_submit')
        this.itemTagstag = page.locator('.tags li')
        this.itemOptions = page.locator('#product [class="input-group col-sm-10"]')
    }

    async categoryNameClick(item: number) {
        await this.categoryItemBase.locator('.prdocutname').nth(item).click()
    }

    async itemGetBreadcrumbText() {
        let breadText = await this.itemBreadcrumb.textContent()
        //@ts-ignore
        this.textTarget = breadText
        return this.textTarget
    }

    async itemHomeBreadcrumbClick() {
        await this.itemHomeBreadcrumb.click()
    }

    async itemGetName() {
        let itemName = await this.itemName.textContent()
        // @ts-ignore
        this.textTarget = itemName
        return this.textTarget
    }

    async itemGetBasePrice() {
        // @ts-ignore
        let strPrice = await this.itemPrice.textContent()
        strPrice?.trim()
        // @ts-ignore
        this.numTarget = parseFloat(strPrice.replaceAll('$', ''))
        return this.numTarget

        this.numTarget = 0
    }

    async itemQtyFill(qty: number) {
        await this.itemQty.fill(qty.toString())
    }

    async itemGetTotalPrice() {
        // @ts-ignore
        let strPrice = await this.itemTotalPrice.textContent()

        //@ts-ignore
        this.numTarget = parseFloat(strPrice?.substring(1))
        return this.numTarget

        this.numTarget = 0
    }

    async itemCartClick() {
        await this.itemAddCart.click()
    }

    async itemPrintClick() {
        await this.itemPrint.click()
    }

    async itemRadioClick(select: number) {
        await this.itemOptions.locator('input').nth(select).click()
    }

    async itemComboSelect(select: string) {
        await this.itemOptions.locator('select').selectOption({label: select})
    }
}