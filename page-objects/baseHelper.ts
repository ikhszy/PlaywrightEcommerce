// @ts-nocheck
import test, { expect, Locator, Page } from '@playwright/test'
import { fa, faker, fakerEN, fakerEN_US } from '@faker-js/faker'
import * as excel from 'exceljs'
import * as fs from 'fs'
const testDataJson = JSON.parse(JSON.stringify(require('../test-data/userData.json')))


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

    // Shirts data variables
    shirtName: string
    shirtPrice: string
    shirtOpt1: string
    shirtOpt2: string

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
        this.firstname = testDataJson.firstname
        this.lastname = testDataJson.lastname
        this.email = testDataJson.email
        this.phone = testDataJson.phone
        this.company = testDataJson.company
        this.address1 = testDataJson.address1
        this.city = testDataJson.city
        this.zipcode = testDataJson.zipcode
        this.country = testDataJson.country
        this.state = testDataJson.state
        this.loginname = testDataJson.loginname
        this.password = testDataJson.password
    }

    async getItemExcel(rownum: number, rowcol: number) {
        // setup for data
        const workbook = new excel.Workbook()

        await workbook.xlsx.readFile("C:\\Users\\Muhammad Ikhsan\\Documents\\AutomationTestStore-PW\\test-data\\pw-dataprovider.xlsx")
        const worksheet = workbook.getWorksheet('shirts')
        var row = worksheet?.getRow(rownum)

        // return value based on column and row
        return row?.getCell(rowcol).value
    }

    async writeRegisterToJson() {
        interface Data {
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
        }

        const data: Data = {
            firstname: fakerEN.person.firstName(),
            lastname: fakerEN.person.lastName(),
            email: fakerEN.internet.email(),
            phone: fakerEN.string.numeric({length: 12}),
            fax: fakerEN.phone.number({style: 'national'}),
            company: fakerEN.company.buzzAdjective(),
            address1: fakerEN.location.streetAddress(),
            address2: fakerEN.location.street(),
            city: fakerEN.location.city(),
            state: fakerEN_US.location.state(),
            zipcode: fakerEN_US.location.zipCode(),
            country: 'United States',
            loginname: fakerEN.internet.username(),
            password: fakerEN.internet.password()
        }

        this.firstname = data.firstname
        this.lastname = data.lastname
        this.email = data.email
        this.phone = data.phone
        this.company = data.company
        this.address1 = data.address1
        this.city = data.city
        this.zipcode = data.zipcode
        this.country = data.country
        this.state = data.state
        this.loginname = data.loginname
        this.password = data.password

        const jsonString = JSON.stringify(data, null, 2)
        console.log(jsonString)

        await fs.writeFile('test-data/userData.json', jsonString, (err) => {
            if(err) {
                console.log('error writing file:'. err)
            } else {
                console.log('success writing file!')
            }
        })
    }
}