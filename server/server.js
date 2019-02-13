// Handle env vars
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname+'/.env')});;

// Load in requirements
const express = require('express');
const bodyParser = require('body-parser');

// Check for environment
const IS_TEST = process.env.ENV === 'test';

// Define port to expose application
const port = process.env.PORT || 3000;

// Load in controllers and api
const controllers = require('./controllers');
const api = require('./api');

// Create application via middleware
const app = express();

// Enable parsing of request/response bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Link the application to the API and the controllers
// Pass the controllers into the API
app.use('/', api(controllers));

// Begin listening if we're not in the testing environment
if (!IS_TEST) {
    app.listen(port, () => {
        console.log(`Server listening on port: ${port}`);
    });
}

module.exports = {app};