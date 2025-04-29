import { Page, expect } from '@playwright/test'
import { NavigationBar } from '../page-objects/navigationBar'
import { loginRegisterPage } from '../page-objects/loginRegisterPage'
import { homePage } from './homePage'

export class pageManager{

    private readonly page: Page
    private readonly navigationBar: NavigationBar
    private readonly loginRegisterPage: loginRegisterPage
    private readonly homePage: homePage

    constructor(page: Page) {
        this.page = page
        this.navigationBar = new NavigationBar(this.page)
        this.loginRegisterPage = new loginRegisterPage(this.page)
        this.homePage = new homePage(this.page)
    }

    nav() {
        return this.navigationBar
    }

    lgn() {
        return this.loginRegisterPage
    }

    home() {
        return this.homePage
    }

}