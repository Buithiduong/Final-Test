import Converter from "../../untils/converter";
let converter = new Converter
class PdpPage {

    elements = {
        qdpLabel: () => cy.get('.tablet-sticky-bottom > .variant__volume-discount > .pdp-favorite'),
        variantOption: (option) => cy.get("input[value='" + option + "']"),
        quantityInput: () => cy.get('#qty'),
        addToCartBtn: () => cy.get('.pdp-info__btn > .btn'),
        itemMiniCart: () => cy.get('.mini-cart__product-price--cost'),
        quantityInputInMiniCart: () => cy.get('.mini-cart__product-quantity > .input'),
        proceedToCheckoutBtn: () => cy.get(':nth-child(2) > .mini-cart__btn-to-checkout'),
        inputEmail: () => cy.get('#dialog-checkout > .bn-dialog-container > [dropdown-panel-container=""] > .bn-dialog__body > .login > .login__right > .login__right__wrapper > .login__auth > .login__form > :nth-child(1) > .input'),
        signInBtn: () => cy.get('#dialog-checkout > .bn-dialog-container > [dropdown-panel-container=""] > .bn-dialog__body > .login > .login__right > .login__right__wrapper > .login__auth > .login__form > .btn'),
        inputPassword: () => cy.get('#dialog-checkout > .bn-dialog-container > [dropdown-panel-container=""] > .bn-dialog__body > .login > .login__right > .login__right__wrapper > .login__auth > .login__form > :nth-child(2) > .input'),
        pickUpInStore: () => cy.get('.checkout-shipping__address > form.d-flex > :nth-child(2) > .checkmark'),
        goToPaymentBtn: () => cy.get('.checkout__next-step-btn > .btn'),
        subTotalOnOrderSummary: () => cy.get('.checkout-order-summary__info > :nth-child(1) > .font-weight-bolder'),
        submitOrderBtn: () => cy.get('.checkout__next-step-btn > .btn'),
        orderConfirmationMsg: () => cy.get('.checkout-confirmation__title' )
    }

    asserstQDPLabelDoNotDisplay() {
        this.elements.qdpLabel().should("not.visible");
    }
    asserstQDPLabelDisplay() {
        this.elements.qdpLabel().should("be.visible");
    }
    chooseVariant(variant) {
        this.elements.variantOption(variant).click();
    }
    inputQuantity(quantity) {
        this.elements.quantityInput().clear().type(quantity);
    }

    clickAddToCart() {
        this.elements.addToCartBtn().click();
    }

    assertItemPriceItems(expectedPrice) {
        this.elements.itemMiniCart()
            .invoke("text")
            .then(priceText => {
                let actualPrice = converter.extractAmountFromPriceString(priceText);
                expect(actualPrice).to.be.closeTo(expectedPrice, 0.001);
            })
    }

    inputQuantityInMiniCart(quantity) {
        cy.wait(1000)
        cy.intercept('POST', "**/DefaultCart/ChangeCartItem").as('changeCartItem')
        this.elements.quantityInputInMiniCart()
            .clear({ force: true })
            .type(quantity, { force: true })
            .type("{enter}", { force: true });
        cy.wait('@changeCartItem').its('response.statusCode').should('eq', 200)
    }
    clickOnProceedToCheckoutBtn(){
        this.elements.proceedToCheckoutBtn().click();
    }
    inputData(email,password) {
        cy.wait(1000)
        this.elements.inputEmail()
            .clear({ force: true })
            .type(email, { force: true })
        this.elements.inputPassword()
            .clear({ force: true })
            .type(password, { force: true })
    }
    clickOnSignInBtn() {
        this.elements.signInBtn().click();
    }
    clickOnPickUpInStoreOption(){
        this.elements.pickUpInStore().click();
    }
    clickOnGoTopaymentBtn(){
        this.elements.goToPaymentBtn().click();
    }
    assertItemPriceSubTotal(expectedPrice) {
        this.elements.subTotalOnOrderSummary()
            .invoke("text")
            .then(priceText => {
                let actualPrice = converter.extractAmountFromPriceString(priceText);
                expect(actualPrice).to.be.closeTo(expectedPrice, 0.001);
            })
    }
    clickOnSubmitOrderBtn(){
        this.elements.submitOrderBtn().click();
    }
}
export default PdpPage