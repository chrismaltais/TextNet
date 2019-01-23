const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv').config({path: path.resolve(__dirname+'/.env')});;
const IS_TEST = process.env.ENV === 'test';
const port = process.env.PORT || 3000;

const controllers = require('./controllers');
const api = require('./api');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', api(controllers));

if (!IS_TEST) {
    app.listen(port, () => {
        console.log(`Server listening on port: ${port}`);
    });
}

module.exports = {app};