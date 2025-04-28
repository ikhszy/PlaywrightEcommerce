import { Page, expect } from '@playwright/test'
import { NavigationBar } from '../page-objects/navigationBar'
import { loginRegisterPage } from '../page-objects/loginRegisterPage'

export class pageManager{

    private readonly page: Page
    private readonly navigationBar: NavigationBar
    private readonly loginRegisterPage: loginRegisterPage

    constructor(page: Page) {
        this.page = page
        this.navigationBar = new NavigationBar(this.page)
        this.loginRegisterPage = new loginRegisterPage(this.page)
    }

    nav() {
        return this.navigationBar
    }

    lgn() {
        return this.loginRegisterPage
    }

}