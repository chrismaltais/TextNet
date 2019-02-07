const { Translate } = require("@google-cloud/translate");
const fs = require("fs");
const path = require('path');

async function translate(stringToTranslate, languageTo) {
  // Your Google Cloud Platform project ID
  translateResult = "";

  // Instantiates a client
  const translate = new Translate();
  let rawdata = fs.readFileSync(path.resolve(__dirname, "../helpers/languageCode.json"));
  let languages = JSON.parse(rawdata);
  var langCode = null;
  for (var i = 0; i < languages.length; i++) {
    if (languageTo.toLowerCase() === languages[i]["name"].toLowerCase()) {
      langCode = languages[i]["code"];
    }
  }

  if (!langCode) {
    return `Unfortunately, ${languageTo} is not a language we can translate to!`
  }

  return await new Promise((resolve, reject) => {
    translate
      .translate(stringToTranslate, langCode)
      .then(results => {
        const translation = results[0];
        console.log(`Text: ${stringToTranslate}`);
        console.log(`Translation: ${translation}`);
        resolve(translation);
      })
      .catch(err => {
        console.error("ERROR:", err);
      });
  });
}

async function getResponse(message) {

  if (message.lastIndexOf(" to ") == -1){
    return 'Invalid translation formatting.  You\'re missing the "to" keyword! Texting "textnet" will return our formatting guidelines :)';
  }
  var stringToTranslate = message
    .substring(
      message.lastIndexOf("translate ") + 10,
      message.lastIndexOf("to ")
    )
    .trim();
  var languageTo = message
    .substring(message.lastIndexOf("to ") + 3, message.lastIndexOf(""))
    .trim();

  var result = await translate(stringToTranslate, languageTo);
  
  return result;
}

module.exports = {
  getResponse
};
