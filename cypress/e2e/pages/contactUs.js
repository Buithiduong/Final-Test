
class ContactUsPage {

    url = "https://prep.brownells.com/contact-us/"

    elements = {
        submitBtn: () => cy.get('#\\30 baea710-1e57-4cf7-82b5-6822ee904f99'),
        firstNameErrorMsg: () => cy.get('#__field_12633_desc'),
        lastNameErrorMsg: () => cy.get('#__field_12634_desc'),
        emailErrorMsg: () => cy.get('#__field_12635_desc'),
        messageErrorMsg: () => cy.get('#__field_12638_desc'),
        inputFirstName: () => cy.get('#\\38 fa1dfc4-6c55-4ae4-a843-f1a9376593b7'),
        inputLastName: () => cy.get('#\\38 6fd0825-dcff-4360-8972-fc5f00fb7e02'),
        inputEmail: () => cy.get('#f605ed5e-efb0-4e16-8576-47b661767b8e'),
        inputMessage: () => cy.get('#ea86b844-fc8e-4ad2-b08a-c61b1a6a141e'),
        submitSuccessMsg: () => cy.get('#ed0fd8ce-dbc2-4318-a1e1-cb4b2d957485 > :nth-child(7) > :nth-child(1) > :nth-child(1)')
    }
    visit() {
        cy.visit(this.url);
    }
    clickOnSubmitBtn() {
        this.elements.submitBtn().click();
    }
    assertErrorMessageRequired(text) {
        this.elements.firstNameErrorMsg().invoke("text").should("contain", text);
        this.elements.lastNameErrorMsg().invoke("text").should("contain", text);
        this.elements.emailErrorMsg().invoke("text").should("contain", text);
        this.elements.messageErrorMsg().invoke("text").should("contain", text);
    }
    inputFristName(text){
        this.elements.inputFirstName().clear().type(text);
    }
    inputLastName(text){
        this.elements.inputLastName().clear().type(text);

    }
    inputEmail(text){
        this.elements.inputEmail().clear().type(text);

    }
    inputMessage(text){
        this.elements.inputMessage().clear().type(text);

    }
    assertErrorMessageInvalid(text){
        this.elements.emailErrorMsg().invoke("text").should("contain",text);
    }
    assertSubmitSuccessMsg(text){
        this.elements.submitSuccessMsg().invoke("text").should("contain", text);
    }
}

export default ContactUsPage