var MessagingResponse = require("twilio").twiml.MessagingResponse;

exports.determineQuery = function(req, res, next) {
  var response = req.body;
  console.log(response);
  const twiml = new MessagingResponse();
  twiml.message("thanks for using textnet");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
};
exports.showSomething = function(req, res, next) {
  res.json({ name: "john doe" });
};
