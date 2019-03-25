// Handle env vars
const path = require('path');
let envPath = path.join(__dirname + '../../.env');
require('dotenv').config({path: envPath});;

const {recommend} = require('./../controllers');
const {recommendAssert} = require('./assertion_data');

describe('Recommendation Controller:', () => {
    describe('Function: getBusiness(message)', () => {
        it('should return the business queried if the business is after the keyword \'recommend\' and before \'near\'', async () => {
            let message = 'recommend coffee shops near Kingston, ON';
            let result = await recommend.getBusiness(message);
            expect(result).toBe('coffee shops');
        });
    });

    describe('Function: getLocation(message)', () => {
        it('should return the location queried if the location is after the keyword \'near\'', async () => {
            let message = 'recommend coffee shops near Kingston, ON';
            let result = await recommend.getLocation(message);
            expect(result).toBe('Kingston, ON');
        });
    });

    describe('Function: checkQueryMixup(message)', () => {
        it('should return a specified error message if the keyword \'in\' is used instead of \'near\'', async () => {
            let message = 'recommend coffee shops in Kingston, ON';
            let result = await recommend.checkQueryMixup(message);
            expect(result).toBeTruthy();
        });
    });

    describe('Function: fixQueryMixup(message)', () => {
        it('should return a specified error message if the keyword \'in\' is used instead of \'near\'', async () => {
            let message = 'recommend coffee shops in Kingston, ON';
            let expectedMessage = 'recommend coffee shops \'near\' Kingston, ON';
            let result = await recommend.fixQueryMixup(message);
            expect(result).toBe(expectedMessage);
        });
    });

    describe('Function: getResponse(message)', () => {
        it('should return a formatted response containing 5 recommendations', async () => {
            let message = recommendAssert.getResponse.validQuery;
            let result = await recommend.getResponse(message);
            expect(result).toContain('5:');
        });

        it('should return a formatted error response if query mixup', async () => {
            let message = recommendAssert.mixedUpQuery;
            let expectedMessage = recommendAssert.fixedQueryError;
            let result = await recommend.getResponse(message);
            expect(result).toBe(expectedMessage);
        });
    });
    
});