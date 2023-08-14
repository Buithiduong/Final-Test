import BrandPage from "./pages/brand";
import brandData from "../fixtures/brandData.json"
let brandPage = new BrandPage;

describe('brand page', () => {
  it('User will redirect to branding listing page when click on [Shop All Our Brands At Once!]', () => {
    console.log("Go to the brand page");
    brandPage.visit();

    console.log("Click Shop All Our Brand button");
    brandPage.clickOnShopAllBrandBtn();

    console.log("Showing correctly brand listing page");
    brandPage.assertTitleListingPageMsg(brandData.titleBrandListingPage);
  })

  it('Brand display correctly when user choose specific letter', () => {
    console.log("Go to the brand page");
    brandPage.visit();

    console.log("Click specific letter in the brand page");
    brandPage.clickOnDletterBtn();

    console.log("Verify that all brand title showing correctly");
    brandPage.assertTitleAllDBrandPage(brandData.titleDBrand);

    console.log("Verify that all brand in page have first letter user click");
    brandPage.assertContentInDBrandPage(brandData.letterBrand)

  })

  it('User will redirect to brand page when click on specific brand', () => {
    console.log("Go to the brand page");
    brandPage.visit();

    console.log("Click specific letter in the brand page");
    brandPage.clickOnDletterBtn();

    console.log("Click specific brand in the list all brand page");
    brandPage.clickOnSpecificBrand();

    console.log("Verify that showing correctly brand title in the page");
    brandPage.assertSpecificBrandTitle(brandData.specificBrandTitle);
  })

  it('All brand display correctly when user click on [VIEW ALL BRANDS] button', () => {
    console.log("Go to the brand page");
    brandPage.visit();

    console.log("Click on View All brand button");
    brandPage.clickOnViewAllBrandBtn();

    console.log("Verify showing correctly title of the page");
    brandPage.assertViewAllBrandTitle(brandData.viewAllBrandTitle);

    console.log("Verify that all brand letter is display on view all brand page");
    brandPage.listAllBrandLetteronViewAllPage();
  })

})