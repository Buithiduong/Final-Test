import DataProduct from "../fixtures/productData.json"
import PdpPage from "../e2e/pages/pdp"

let pdpPage = new PdpPage()
describe('template spec', () => {
  it('QDP label do not display when user do not select variant has setting QDP price', () => {
    console.log("Visit Pdp url");
    cy.visit(DataProduct.productQDP.url)

    console.log("assert adp lablel do not display");
    pdpPage.asserstQDPLabelDoNotDisplay();

  })
  it('QDP label display when user select variant has setting QDP price', () => {
    console.log("Visit Pdp url");
    cy.visit(DataProduct.productQDP.url)

    console.log("choose variant");
    for(let variant of DataProduct.productQDP.variantItems){
      pdpPage.chooseVariant(variant);
    }
    console.log("assert QDP label display");
    pdpPage.asserstQDPLabelDisplay();

  })
  it(' The rest quantity charged at QDP price per unit when user add product to cart greater than quantity threshold', () => {
    console.log("Visit Pdp url");
    cy.visit(DataProduct.productQDP.url)

    console.log("choose variant");
    for(let variant of DataProduct.productQDP.variantItems){
      pdpPage.chooseVariant(variant);
    }
    console.log("assert QDP label display");
    pdpPage.asserstQDPLabelDisplay();

    cy.log("input quantity");
    pdpPage.inputQuantity(DataProduct.productQDP.quantityDiscounts[0].quantity);

    cy.log("click add to cart button");
    pdpPage.clickAddToCart();

    cy.log("assert item values in mini cart display correctly")
    pdpPage.assertItemPriceItems(DataProduct.productQDP.quantityDiscounts[0].totalAmount);

    cy.log("input quantity in mini cart page");
    pdpPage.inputQuantityInMiniCart(DataProduct.productQDP.quantityDiscounts[1].quantity);

    cy.log("assert item values in mini cart display correctly")
    pdpPage.assertItemPriceItems(DataProduct.productQDP.quantityDiscounts[1].totalAmount);

    cy.log("input more quantity in mini cart page");
    pdpPage.inputQuantityInMiniCart(DataProduct.productQDP.quantityDiscounts[1].quantity + 3);

    cy.log("assert item values in mini cart display correctly")
    pdpPage.assertItemPriceItems(DataProduct.productQDP.quantityDiscounts[1]
      .totalAmount + 3 *DataProduct.productQDP.quantityDiscounts[1].pricePerUnit);
    
    
  })

  it('QDP apply successfully when user checkout enough quantity', () => {
    console.log("Visit Pdp url");
    cy.visit(DataProduct.productQDP.url)

    console.log("choose variant");
    for(let variant of DataProduct.productQDP.variantItems){
      pdpPage.chooseVariant(variant);
      cy.wait(2000)
    }
    console.log("assert QDP label display");
    pdpPage.asserstQDPLabelDisplay();

    cy.log("input quantity");
    pdpPage.inputQuantity(DataProduct.productQDP.quantityDiscounts[0].quantity);

    cy.log("click add to cart button");
    pdpPage.clickAddToCart();

    cy.log("assert item values in mini cart display correctly")
    pdpPage.assertItemPriceItems(DataProduct.productQDP.quantityDiscounts[0].totalAmount);

    cy.log("input quantity in mini cart page");
    pdpPage.inputQuantityInMiniCart(DataProduct.productQDP.quantityDiscounts[1].quantity);

    cy.log("assert item values in mini cart display correctly")
    pdpPage.assertItemPriceItems(DataProduct.productQDP.quantityDiscounts[1].totalAmount);

    console.log("click the proceed to check button");
    pdpPage.clickOnProceedToCheckoutBtn();

    console.log("Input Email and password to login");
    pdpPage.inputData(DataProduct.productQDP.email, DataProduct.productQDP.password);
    pdpPage.clickOnSignInBtn();

    console.log("Assert sub total on Order Summary display correctly");
    pdpPage.assertItemPriceSubTotal(DataProduct.productQDP.quantityDiscounts[1].totalAmount);
    
    console.log("Submit Order successfully with correctly amount");
    pdpPage.clickOnSubmitOrderBtn();
  })

})