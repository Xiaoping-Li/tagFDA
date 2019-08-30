const sponsers = require('../drugsatfda20190827/Applications.js');
const products = require('../drugsatfda20190827/Products.js');
const marketStatus = require('../drugsatfda20190827/MarketingStatus.js');

// Populate Products with Sponsor name
const populateProducts = (products, sponsers, marketStatus) => {
  products.forEach(p => {
    const appNO = p["ApplNo"];
    const productNo = p["ProductNo"];

    const matchS = sponsers.find(item => item["ApplNo"] === appNO);
    const matchM = marketStatus.find(item => item["ApplNo"] === appNO && item["ProductNo"] === productNo);

    if (matchS) {
      p["SponsorName"] = matchS["SponsorName"];
    } else {
      p["SponsorName"] = "";
    } 

    if (matchM) {
      p["MarketingStatus"] = matchM["MarketingStatus"];
    } else {
      p["MarketingStatus"] = "";
    }
  });
};

populateProducts(products, sponsers, marketStatus);

module.exports = products;