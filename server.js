const express = require('express');
const bodyParser = require('body-parser');
const IS_TEST = process.env.ENV === 'test';
const port = process.env.PORT || 3000;

const controllers = require('./controllers');
const api = require('./api');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/', api(controllers))

if (!IS_TEST) {
    app.listen(port, () => {
        console.log(`Server listening on port: ${port}`);
    });
}

module.exports = {app};