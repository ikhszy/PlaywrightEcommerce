import { expect, Locator, Page } from '@playwright/test'
import { baseHelper } from './baseHelper'

export class forgotPage extends baseHelper {

    private readonly fLoginname: Locator
    private readonly fEmail: Locator
    private readonly forgotLastname: Locator
    private readonly continueBtn: Locator
    private readonly backBtn: Locator

    constructor(page: Page) {
        super(page)

        this.fLoginname = page.locator('#forgottenFrm_loginname')
        this.fEmail = page.locator('#forgottenFrm_email')
        this.forgotLastname = page.locator('#forgottenFrm_lastname')
        this.continueBtn = page.getByTitle('Continue')
        this.backBtn = page.getByTitle('Back')
    }

    async forgotLoginnameFill(loginname: string) {
        await this.fLoginname.fill(loginname)
    }

    async forgotEmailFill(email: string) {
        await this.fEmail.fill(email)
    }

    async forgotLastnameFill(lname: string) {
        await this.forgotLastname.fill(lname)
    }

    async forgotContinueClick() {
        await this.continueBtn.click()
    }

    async forgotBackClick() {
        await this.backBtn.click()
    }
}