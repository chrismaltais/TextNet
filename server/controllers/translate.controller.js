const { Translate } = require("@google-cloud/translate");
const fs = require("fs");
const path = require('path');

async function translate(stringToTranslate, languageTo) {
    const { Translate } = require("@google-cloud/translate");

    // Instantiates a client
    const translateInstance = new Translate();

    let languages = await getAllLanguages();
    var langCode = await getLanguageCode(languages, languageTo);

    if (!langCode) {
        return `Unfortunately, ${languageTo} is not a language we can translate to!`
    }

    try {
        let translatedResponses = await translateInstance.translate(stringToTranslate, langCode)
        const translation = translatedResponses[0];
        console.log(`Text: ${stringToTranslate}`);
        console.log(`Translation: ${translation}`);
        return translation;
    } catch (e) {
        return `Unfortunately we can\'t translate that right now, please try again later!`
    }
}

async function getAllLanguages() {
    let languageCodesJSON = fs.readFileSync(path.resolve(__dirname, "../helpers/languageCode.json"));
    let languages = JSON.parse(languageCodesJSON);
    return languages;
}

async function getLanguageCode(languagesAvailable, targetLanguage) {
    for (var i = 0; i < languagesAvailable.length; i++) {
        if (targetLanguage.toLowerCase() === languagesAvailable[i]["name"].toLowerCase()) {
            return languagesAvailable[i]["code"];
        }
    }
    return null;
}

async function getResponse(message) {
    let isValidQuery = await checkValidQuery(message);
    if (!isValidQuery){
        return 'Invalid translation formatting.  You\'re missing the "to" keyword! Texting "textnet" will return our formatting guidelines :)';
    }
  
    let stringToTranslate = await getStringToTranslate(message);

    let languageTo = await getTargetLanguage(message);

    var result = await translate(stringToTranslate, languageTo);
  
    return result;
}

async function checkValidQuery(message) {
    if (message.lastIndexOf(" to ") == -1){
        return Promise.reject(false);
    } 
    return Promise.resolve(true);
}

async function getStringToTranslate(message) {
    let stringToTranslate = message.substring(
        message.lastIndexOf("translate ") + 10,
        message.lastIndexOf("to ")
    ).trim();
    return stringToTranslate;
}

async function getTargetLanguage(message) {
    let targetLanguage = message.substring(
        message.lastIndexOf("to ") + 3, 
        message.lastIndexOf("")
    ).trim();
    return targetLanguage;
}

module.exports = {
  getResponse,
  checkValidQuery,
  getStringToTranslate,
  getTargetLanguage,
  getLanguageCode,
  getAllLanguages,
  translate
};
