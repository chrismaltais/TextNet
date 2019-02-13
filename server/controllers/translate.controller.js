const { Translate } = require("@google-cloud/translate");
const fs = require("fs");
const path = require('path');

async function translate(stringToTranslate, languageTo) {

    // Instantiates a client
    const translateInstance = new Translate();
    let languageCodesJSON = fs.readFileSync(path.resolve(__dirname, "../helpers/languageCode.json"));
    let languages = JSON.parse(languageCodesJSON);
    var langCode = null;
    for (var i = 0; i < languages.length; i++) {
        if (languageTo.toLowerCase() === languages[i]["name"].toLowerCase()) {
            langCode = languages[i]["code"];
        }
    }

    if (!langCode) {
        return `Unfortunately, ${languageTo} is not a language we can translate to!`
    }

    let translatedResponses = await translateInstance.translate(stringToTranslate, langCode)
    console.log(translatedResponses)

    try {
        
        
        const translation = translatedResponses[0];
        console.log(`Text: ${stringToTranslate}`);
        console.log(`Translation: ${translation}`);
        return translation;
    } catch (e) {
        return `Unfortunately we can\'t translate that right now, please try again later!`
    }
}

async function getResponse(message) {

    if (message.lastIndexOf(" to ") == -1){
        return 'Invalid translation formatting.  You\'re missing the "to" keyword! Texting "textnet" will return our formatting guidelines :)';
    }
  
    var stringToTranslate = message.substring(
        message.lastIndexOf("translate ") + 10,
        message.lastIndexOf("to ")
    ).trim();

    var languageTo = message.substring(
        message.lastIndexOf("to ") + 3, 
        message.lastIndexOf("")
    ).trim();

  var result = await translate(stringToTranslate, languageTo);
  
  return result;
}

module.exports = {
  getResponse
};
