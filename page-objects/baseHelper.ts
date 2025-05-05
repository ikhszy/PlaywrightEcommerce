// @ts-nocheck
import { expect, Locator, Page } from '@playwright/test'
import { fakerEN, fakerEN_US } from '@faker-js/faker'
import test from 'node:test'
const testData = JSON.parse(JSON.stringify(require('../test-data/registerUser.json')))

export class baseHelper{
    readonly page: Page

    // register data variables
    firstname: string
    lastname: string
    email: string
    phone: string
    fax: string
    company: string
    address1: string
    address2: string
    city: string
    state: string
    zipcode: string
    country: string
    loginname: string
    password: string

    constructor(page: Page) {
        this.page = page
    }

    // create wait method with second
    async waitForSeconds(time: number) {
        await this.page.waitForTimeout(time * 1000)
    }

    // method for dropdown
    async dragDrop(objtodrag: Locator, targetobject: Locator) {
        // identify area first
        let droparea = await targetobject.boundingBox()
        let dragobj = await objtodrag.boundingBox()

        // set the coordinate of the middle of the drop area
        let xDrop = droparea?.x + droparea?.width / 2
        let yDrop = droparea?.y + droparea?.height / 2

        // set the coordinate of the drag object
        let xDrag = dragobj.x + dragobj.width / 2
        let yDrag = dragobj.y + dragobj.height / 2

        // moving mouse to drag and drop
        await this.page.mouse.move(xDrag, yDrag)
        await this.page.mouse.down()
        await this.page.mouse.move(xDrop, yDrop)
        await this.page.mouse.up()
    }

    async generateRegisterData() {
        this.firstname = fakerEN.person.firstName()
        this.lastname = fakerEN.person.lastName()
        this.email = fakerEN.internet.email()
        this.phone = fakerEN.phone.number()
        this.company = fakerEN.company.name()
        this.address1 = fakerEN.location.streetAddress()
        this.city = fakerEN.location.city()
        this.zipcode = fakerEN.location.zipCode()
        this.country = 'United States'
        this.state = fakerEN_US.location.state()
        this.loginname = 'login_' + this.lastname
        this.password = 'pass1234'
    }

    async getRegisterDataJSON() {
        this.firstname = testData.firstname
        this.lastname = testData.lastname
        this.email = testData.email
        this.phone = testData.phone
        this.company = testData.company
        this.address1 = testData.address1
        this.city = testData.city
        this.zipcode = testData.zipcode
        this.country = testData.country
        this.state = testData.state
        this.loginname = testData.loginname
        this.password = testData.password
    }
}