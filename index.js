/**
 * 
 * Card Validation Library
 *
 * @author Naseef O
 *
 */

/**
* Cards details
* Todo -> add other cards
*/
const cardDetails = {
  Visa: {
    code: "Visa",
    displayName: "Visa",
    lengths: [16],
    cvvLength: 3,
    imageUrl: "./assets/visa.svg",
  },
  MasterCard: {
    code: "MasterCard",
    displayName: "MasterCard",
    lengths: [16],
    cvvLength: 3,
    imageUrl: "./assets/mastercard.svg",
  },
  Amex: {
    code: "Amex",
    displayName: "American Express",
    lengths: [15],
    cvvLength: 4,
    imageUrl: "./assets/amex.svg",
  },
};

/**
 * This method is used to identify card type
 *
 * @param {String} cardNumber
 * @returns
 */
const identifyCardType = (cardNumber) => {
  // Todo --> check to identify other cards
  if (!cardNumber) return null;
  // visa
  let re = new RegExp("^4");
  if (cardNumber.match(re) != null) { return "Visa"; }

  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(cardNumber)) {
    return "MasterCard";
  }

  // AMEX
  re = new RegExp("^3[47]");
  if (cardNumber.match(re) != null) { return "Amex"; }

  // Discover
  re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
  if (cardNumber.match(re) != null) { return "Discover"; }

  // Diners
  re = new RegExp("^36");
  if (cardNumber.match(re) != null) { return "Diners"; }

  // Diners - Carte Blanche
  re = new RegExp("^30[0-5]");
  if (cardNumber.match(re) != null) { return "Diners - Carte Blanche"; }

  // JCB
  re = new RegExp("^35(2[89]|[3-8][0-9])");
  if (cardNumber.match(re) != null) { return "JCB"; }

  // Visa Electron
  re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
  if (cardNumber.match(re) != null) { return "Visa Electron"; }
};

/**
 * This method is used to get card details from card number
 *
 * @param {String} cardNumber
 * @returns
 */
const getCardNumberDetails = (cardNumber) => {
  const cardType = identifyCardType(cardNumber);
  return cardType ? cardDetails[cardType] : null;
};

/**
 * This method is used to get card details from card type
 *
 * @param {String} cardNumber
 * @returns
 */
const getCardDetailsByDetails = (cardType) => (cardType ? cardDetails[cardType] : null);

/**
 * This method is used to get card default image
 *
 * @param {String} cardType
 * @returns
 */
const getCardDefaultImageByDetails = (cardType) => {
  if (cardType && cardDetails[cardType]) {
    return cardDetails[cardType].defaultImageUrl;
  }
  return "";
};

/**
 * This method is used to check the card number is valid
 *
 * @param {String} cardNumber
 * @param {String} type
 * @returns
 */
const isValidCardNumber = (cardNumber, type) => cardDetails[type]
  && cardDetails[type].lengths.includes(cardNumber.length);



/**
* Checking is valid card length by card number and card type ,
* default it's 16 for cyber-source-integration
*
* @param {*} cardNumber
* @returns
*/
const isValidCardLength = (cardNumber) => {
  const valid = false;
  if (cardNumber) {
    const card = getCardNumberDetails(cardNumber);
    if (card
      && card.lengths.includes(cardNumber.length)) {
      return true;
    } if (cardNumber?.length === 16) {
      return true;
    }
  }
  return valid;
};

const formatCardNumber = (e, value, position) => {
  const format = (val) => val.replace(/[^\dA-Z]/gi, "")
    .toUpperCase()
    .replace(/(.{4})/g, "$1 ")
    .trim();
  const countSpaces = (text) => {
    const spaces = text.match(/(\s+)/g);
    return spaces ? spaces.length : 0;
  };
  const element = e.target;
  element.value = format(value);
  if (position !== element.value.length) {
    const beforeCaret = value.substr(0, position);
    const countPrevious = countSpaces(beforeCaret);
    const countCurrent = countSpaces(format(beforeCaret));
    element.selectionEnd = position + (countCurrent - countPrevious);
  }
};

export {
  getCardNumberDetails,
  isValidCardNumber,
  getCardDetailsByDetails,
  getCardDefaultImageByDetails,
  isValidCardLength,
  formatCardNumber,
};
