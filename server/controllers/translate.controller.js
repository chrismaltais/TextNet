const { Translate } = require("@google-cloud/translate");
const fs = require("fs");

async function translate(stringToTranslate, languageTo) {
  console.log(stringToTranslate, languageTo);
  // Your Google Cloud Platform project ID
  translateResult = "";

  // Instantiates a client
  const translate = new Translate();
  let rawdata = fs.readFileSync("./helpers/languageCode.json");
  let languages = JSON.parse(rawdata);
  for (var i = 0; i < languages.length; i++) {
    if (languageTo.toLowerCase() === languages[i]["name"].toLowerCase()) {
      var langCode = languages[i]["code"];
    }
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
  console.log(result);
  return result.data;
}

module.exports = {
  getResponse
};
