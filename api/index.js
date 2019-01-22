const Router = require('express').Router;
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = (controllers) => {
    let api = Router();
    let {directions, translate, message, help} = controllers;
    api.post('/', async (req, res) => {
        console.log(req);
        console.log(req.body);
        console.log(req.body.Body);
        let messageRaw = req.body.Body;
        let messageParsed = await message.parse(messageRaw);
        let response;
        console.log('Message Parsed: ', messageParsed);
        if (messageParsed === 'DIRECTIONS') {
            response = await directions.getResponse(messageRaw)
            //api.use('/directions', directions(message))
        } else if (messageParsed === 'TRANSLATE') {
            response = await translate.getResponse(messageRaw)
            //api.use('/translate', translate(message, controllers));
        } else if (messageParsed === 'HELP') {
            response = help.getResponse();
        } else {
            response = 'Nothing happened';
        }

        const twiml = new MessagingResponse();
        twiml.message(response);
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    })
    return api;
}