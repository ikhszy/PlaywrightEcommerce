import { Page, expect } from '@playwright/test'
import { NavigationBar } from '../page-objects/navigationBar'
import { loginRegisterPage } from '../page-objects/loginRegisterPage'
import { homePage } from './homePage'
import { itemPage } from './itemPage'
import { cartPage } from './cartPage'

export class pageManager{

    private readonly page: Page
    private readonly navigationBar: NavigationBar
    private readonly loginRegisterPage: loginRegisterPage
    private readonly homePage: homePage
    private readonly itemPage: itemPage
    private readonly cartPage: cartPage

    constructor(page: Page) {
        this.page = page
        this.navigationBar = new NavigationBar(this.page)
        this.loginRegisterPage = new loginRegisterPage(this.page)
        this.homePage = new homePage(this.page)
        this.itemPage = new itemPage(this.page)
        this.cartPage = new cartPage(this.page)
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

    item() {
        return this.itemPage
    }

    cart() {
        return this.cartPage
    }

}