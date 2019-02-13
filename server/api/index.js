const Router = require("express").Router;
const MessagingResponse = require("twilio").twiml.MessagingResponse;

module.exports = (controllers) => {
  let api = Router();
  let { directions, translate, message, help, news, wolfram, recommend } = controllers;

  api.post("/api", async (req, res) => {
      let messageRaw = req.body.Body;
      let messageParsed = await message.parse(messageRaw);
      let response;
      console.log("Message Parsed: ", messageParsed);
      try {
          if (messageParsed === "DIRECTIONS_QUERY") {
              response = await directions.getResponse(messageRaw);
          } else if (messageParsed === "TRANSLATE_QUERY") {
              response = await translate.getResponse(messageRaw);
          } else if (messageParsed === "NEWS_QUERY") {
              response = await news.getResponse();
          } else if (messageParsed === "WOLFRAM_QUERY") {
              response = await wolfram.getResponse(messageRaw);
          } else if (messageParsed === "RECOMMEND_QUERY") {
              response = await recommend.getResponse(messageRaw);
          } else if (messageParsed === "TEXTNET_HELP_QUERY") {
              response = help.getResponse();
          } else {
              response = 'Your query is invalid, please try again.  Texting "textnet" will return our formatting guidelines :)';
          }
      } catch (err) {
          response = 'Something went wrong, please try again.  Texting "textnet" will return our formatting guidelines :)';
          console.log(err);
      }

      const twiml = new MessagingResponse();
      twiml.message(response);
      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());
  });
  return api;
};
