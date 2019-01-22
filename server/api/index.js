const Router = require("express").Router;
const MessagingResponse = require("twilio").twiml.MessagingResponse;

module.exports = controllers => {
  let api = Router();
  let { directions, translate, message, help, news, wolfram } = controllers;
  api.post("/api", async (req, res) => {
    let messageRaw = req.body.Body;
    let messageParsed = await message.parse(messageRaw);
    console.log(messageParsed);
    let response;
    console.log("Message Parsed: ", messageParsed);
    if (messageParsed === "DIRECTIONS") {
      response = await directions.getResponse(messageRaw);
      //api.use('/directions', directions(message))
    } else if (messageParsed === "TRANSLATE") {
      response = await translate.getResponse(messageRaw);
      //api.use('/translate', translate(message, controllers));
    } else if (messageParsed === "NEWS") {
      response = await news.getResponse();
    } else if (["WHO", "WHAT", "WHERE", "HOW", "WHY", "WHEN"].includes(messageParsed)) {
      response = await wolfram.getResponse(messageRaw);
    } else if (messageParsed === "HELP") {
      response = help.getResponse();
    } else {
      response = "Nothing happened";
    }
    console.log("Response inside index.js: ", response);
    const twiml = new MessagingResponse();
    twiml.message(response);
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  });
  return api;
};
