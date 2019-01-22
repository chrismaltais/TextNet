require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

// Create Twilio Client
const client  = require('twilio')(accountSid, authToken);

message = {
    to: '+16132040531',
    from: '+18193033903',
    body: 'Hello world'
}

client.messages.create(message).then((message) => console.log(message.sid));