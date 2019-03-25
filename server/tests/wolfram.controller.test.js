// Handle env vars
const path = require('path');
let envPath = path.join(__dirname + '../../.env');
require('dotenv').config({path: envPath});

const {wolfram} = require('../controllers');

describe('Wolfram Controller', () => {
    describe('Function: getResponse()', () => {
        it('should return an answer given correct formatting', async () => {
            let message = 'why is the sky blue';
            let expectedResult = 'The sky\'s blue color is a result of the effect of Rayleigh scattering. Shorter-wavelength blue light is more strongly scattered in the Earth\'s atmosphere than longer-wavelength red light. As a result, the human eye perceives the color blue when looking at the sky';
            let result = await wolfram.getResponse(message);
            expect(result).toBe(expectedResult);
        });

        it('should parse the question if it begins with keyword \'query\', and return an answer', async () => {
            let message = 'query is the sky blue';
            let result = await wolfram.getResponse(message);
            expect(result).toBe('Yes');
        });

        it('should return a formatted message if API can not return result', async () => {
            let message = 'what is a sdkfjsdlkfj';
            let expectedResult = 'Invalid query: Unfortunately TextNet isn\'t smart enough to figure that one out. Ask us another question! :)'
            let result = await wolfram.getResponse(message);
            expect(result).toBe(expectedResult);
        });
    })
})