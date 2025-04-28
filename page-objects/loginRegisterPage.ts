import { expect, Locator, Page } from '@playwright/test'
import { baseHelper } from './baseHelper'

export class loginRegisterPage extends baseHelper{
    // account login page variables
    private readonly registerRadio: Locator
    private readonly continueBtn: Locator
    private readonly loginText: Locator
    private readonly passwordText: Locator
    private readonly forgotPass: Locator
    private readonly forgotLogin: Locator
    private readonly loginBtn: Locator

    // register form variables
    private readonly fNameRegister: Locator
    private readonly lNameRegister: Locator
    private readonly emailRegister: Locator
    private readonly telephoneRegister: Locator
    private readonly faxRegister: Locator
    private readonly companyRegister: Locator
    private readonly address1Register: Locator
    private readonly address2Register: Locator
    private readonly cityRegister: Locator
    private readonly stateSelRegister: Locator
    private readonly zipRegister: Locator
    private readonly countryRegister: Locator
    private readonly loginnameRegister: Locator
    private readonly passwordRegister: Locator
    private readonly passwordConfirmRegister: Locator
    private readonly subscribeYRegister: Locator
    private readonly subscribeNRegister: Locator
    private readonly privacyCheckRegister: Locator
    // private readonly continueBtnRegister: Locator --> unused due to same locator as previous

    constructor(page: Page){
        super(page)

        // account login page locators
        this.registerRadio = page.locator('#accountFrm_accountregister')
        this.continueBtn = page.locator('button').getByText('Continue')
        this.loginText = page.locator('#loginFrm_loginname')
        this.passwordText = page.locator('loginFrm_password')
        this.forgotPass = page.locator('.loginbox form-horizontal').getByRole('link', {name: 'Forgot your password?'})
        this.forgotLogin = page.locator('.loginbox form-horizontal').getByRole('link', {name: 'Forgot your login?'})
        this.loginBtn = page.getByRole('button', {name: 'Login'})

        // register form locators
        this.fNameRegister = page.locator('#AccountFrm_firstname')
        this.lNameRegister = page.locator('#AccountFrm_lastname')
        this.emailRegister = page.locator('#AccountFrm_email')
        this.telephoneRegister = page.locator('#AccountFrm_telephone')
        this.faxRegister = page.locator('#AccountFrm_fax')
        this.companyRegister = page.locator('#AccountFrm_company')
        this.address1Register = page.locator('#AccountFrm_address_1')
        this.address2Register = page.locator('#AccountFrm_address_2')
        this.cityRegister = page.locator('#AccountFrm_city')
        this.stateSelRegister = page.locator('#AccountFrm_zone_id')
        this.zipRegister = page.locator('#AccountFrm_postcode')
        this.countryRegister = page.locator('#AccountFrm_country_id')
        this.loginnameRegister = page.locator('#AccountFrm_loginname')
        this.passwordRegister = page.locator('#AccountFrm_password')
        this.passwordConfirmRegister = page.locator('#AccountFrm_confirm')
        this.subscribeYRegister = page.locator('#AccountFrm_newsletter1')
        this.subscribeNRegister = page.locator('#AccountFrm_newsletter0')
        this.privacyCheckRegister = page.locator('#AccountFrm_agree')
    }

    // account login page method
    async registerRadioClick() {
        await this.registerRadio.click()
        await expect(this.registerRadio).toHaveAttribute('checked', 'checked')
    }

    async continueBtnClick() {
        await this.continueBtn.click()
        await this.waitForSeconds(2)
    }

    async loginnameInput(input: string) {
        await this.loginText.fill(input)
    }

    async loginpasswordInput(input: string) {
        await this.passwordText.fill(input)
    }

    async forgotPassClick() {
        await this.forgotPass.click()
    }

    async forgotLoginClick() {
        await this.forgotLogin.click()
    }

    async loginBtnClick() {
        await this.loginBtn.click()
    }

    // register form method

    async regFirstName(input: string) {
        await this.fNameRegister.fill(input)
    }

    async regLastName(input: string) {
        await this.lNameRegister.fill(input)
    }

    async regEmail(input: string) {
        await this.emailRegister.fill(input)
    }

    async regTelephone(input: string) {
        await this.telephoneRegister.fill(input)
    }

    async regFax(input: string) {
        await this.faxRegister.fill(input)
    }

    async regCompany(input: string) {
        await this.companyRegister.fill(input)
    }

    async regAddress1(input: string) {
        await this.address1Register.fill(input)
    }

    async regAddress2(input: string) {
        await this.address2Register.fill(input)
    }

    async regCity(input: string) {
        await this.cityRegister.fill(input)
    }

    async regStateSelect(input: string) {
        await this.stateSelRegister.selectOption({label: input})
    }

    async regZipcode(input: string) {
        await this.zipRegister.fill(input)
    }

    async regCountrySelect(input: string) {
        await this.countryRegister.selectOption({label: input})
    }

    async regLoginname(input: string) {
        await this.loginnameRegister.fill(input)
    }

    async regPassword(input: string) {
        await this.passwordRegister.fill(input)
    }

    async regPasswordConfirm(input: string) {
        await this.passwordConfirmRegister.fill(input)
    }

    // 0 --> No or 1 --> Yes
    async regSubscribe(input: number) {
        if(input = 0) {
            await this.subscribeNRegister.click()
        } else if(input = 1){
            await this.subscribeYRegister.click()
        }
    }

    async regPrivacyCheck() {
        await this.privacyCheckRegister.click()
    }
}