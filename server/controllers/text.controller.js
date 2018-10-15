var MessagingResponse = require("twilio").twiml.MessagingResponse;
const { Translate } = require("@google-cloud/translate");
var async = require("async");
const fs = require("fs");

var finalTranslation = "";
exports.determineQuery = async function(req, res, next) {
  var query = req.body.Body;

  var queryArr = query.split(" ");
  task = queryArr[0];

  if (task == "translate") {
    var stringToTranslate = query.substring(
      query.lastIndexOf("translate ") + 10,
      query.lastIndexOf("to ")
    );

    // var stringToTranslate = query.substring(
    //   query.lastIndexOf("translate ") + 10,
    //   query.lastIndexOf("from ")
    // );

    // var languageFrom = query.substring(
    //   query.lastIndexOf("from ") + 5,
    //   query.lastIndexOf("to ")
    // );

    var languageTo = query.substring(
      query.lastIndexOf("to ") + 3,
      query.lastIndexOf("")
    );

    translation = "";
    translate(stringToTranslate, languageTo).then(val => {
      const twiml = new MessagingResponse();
      twiml.message(val);
      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());
    });
  }
};
exports.showSomething = function(req, res, next) {
  res.json({ name: "john doe" });
};

async function translate(stringToTranslate, languageTo) {
  // Your Google Cloud Platform project ID
  translateResult = "";

  // Instantiates a client
  const translate = new Translate({
    projectId: process.env.GOOGLE_PROJECT_ID
  });
  let rawdata = fs.readFileSync("./languageCode.json");
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
