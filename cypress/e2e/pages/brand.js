class BrandPage{
    url = "https://prep.brownells.com/brands/"
    elements = {
        shopAllBrandBtn: () => cy.get('.content-block__content > p'),
        titleListingPageMsg: () => cy.get('.manufacture-listing-title'),
        dBrandBtn: () => cy.get('.manufacturer-list > :nth-child(4) > a'),
        titleDBrandPage: () => cy.get('.manufacturer-detail__title'),
        specificBrand: () => cy.get('.row > :nth-child(13) > a'),
        specificBrandTitle: () => cy.get('.manufacturer-listing__header--title'),
        viewAllBrandBtn: () => cy.get('.d-block'),
        viewAllBrandTitle: () => cy.get('.manufacturer-detail__title')
    }

    visit(){
        cy.visit(this.url);
    }
    clickOnShopAllBrandBtn(){
        this.elements.shopAllBrandBtn().click();
    }
    assertTitleListingPageMsg(text){
        this.elements.titleListingPageMsg().invoke("text").should("contain",text);
    }
    clickOnDletterBtn(){
        this.elements.dBrandBtn().click();
    }
    assertTitleAllDBrandPage(text){
        this.elements.titleDBrandPage().invoke("text").should("contain",text)
    }
    assertContentInDBrandPage(text){
        cy.get('.manufacturer-detail__list .row')
            .children()
            .then(elements => {
                const n = elements.length;
                for (let i = 1; i < n; i++) {
                    cy.get(`.row > :nth-child(${i}) > a`).invoke("text").then(
                            elementText => {
                                const firstChar = elementText.charAt(0);
                                expect(firstChar).to.equal(text);}
                )}
            });
    }
    clickOnSpecificBrand(){
        this.elements.specificBrand().click();
    }
    assertSpecificBrandTitle(text){
        this.elements.specificBrandTitle().invoke("text").should("contain",text)
    }
    clickOnViewAllBrandBtn(){
        this.elements.viewAllBrandBtn().click();
    }
    assertViewAllBrandTitle(text){
        this.elements.viewAllBrandTitle().invoke("text").should("contain",text)
    }
    listAllBrandLetteronViewAllPage(){
        cy.get('.manufacturer-detail__list')
        .children()
        .then(elements => {
            const n = elements.length;
            for (let i = 1; i <= n; i++) {
                cy.get(`.row > :nth-child(${i}) > .bn-select > .bn-select__selected-item`).invoke("text").then(
                        elementText => {
                            const firstChar = elementText.charAt(0).toLowerCase();
                            cy.get(`.manufacturer-list > :nth-child(${i}) > a`).invoke("text").then(
                                text => {
                                    expect(firstChar).to.equal(text.trim());
                                }
                            )
                            }
            )}
        });
    }
}

export default BrandPage