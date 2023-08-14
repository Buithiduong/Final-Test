import ContactUsPage from "./pages/contactUs";
import contactUsData from "../fixtures/contactUsData.json";


let contactUs = new ContactUsPage;

describe('contact us page', () => {
  it('Error message is shown when user input invalid data', () => {
    console.log("Go to the contact us page");
    contactUs.visit();

    console.log("Required error message is shown when user blank data in required fields");
    contactUs.clickOnSubmitBtn();
    contactUs.assertErrorMessageRequired(contactUsData.requiredErrorMsg);

    console.log("Invalid Error message is show when user input invalid email address");
    contactUs.inputEmail(contactUsData.invalidEmail);
    contactUs.clickOnSubmitBtn();
    contactUs.assertErrorMessageInvalid(contactUsData.invalidErrorMsg);
  })

  it('Contact us form is submit successfully when user input valid data', () => {
    console.log("Go to the contact us page");
    contactUs.visit();

    console.log("Input valid data for all fields");
    contactUs.inputFristName(contactUsData.firstName);
    contactUs.inputLastName(contactUsData.lastName);
    contactUs.inputEmail(contactUsData.email);
    contactUs.inputMessage(contactUsData.message);
    
    console.log("Click submit button");
    contactUs.clickOnSubmitBtn();
    contactUs.assertSubmitSuccessMsg(contactUsData.submitSuccessMsg)
  })
})