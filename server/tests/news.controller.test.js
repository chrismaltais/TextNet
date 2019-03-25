// Handle env vars
const path = require('path');
let envPath = path.join(__dirname + '../../.env');
require('dotenv').config({path: envPath});

const {news} = require('./../controllers');

describe('News Controller: ', () => {
    describe('Function: getResponse()', () => {
        it('should return the top 5 headlines from CNN', async () => {
            let message = 'news';
            let results = await news.getResponse(message);
            expect(results.length).toBeGreaterThan(30);
        });
    });
});