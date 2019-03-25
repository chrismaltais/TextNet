// Handle env vars
const path = require('path');
let envPath = path.join(__dirname + '../../.env');
require('dotenv').config({path: envPath});

const {translate} = require('./../controllers');
//const {directionsAssert} = require('./assertion_data');

describe('Translate Controller:', () => {
    describe('Function: checkValidQuery(message)', () => {
        it('should return true if query is valid', async () => {
            let message = 'translate hello to french';
            let result = translate.checkValidQuery(message);
            expect(result).toBeTruthy();
        });

        it('should return false if missing keyword \'to\'', async () => {
            let message = 'translate hello french';
            let empty = {};
            let result = translate.checkValidQuery(message);
            expect(result).rejects.toBeFalsy();
        });
    });

    describe('Function: getStringToTranslate(message)', () => {
        it('should return desired string to translate from query', async () => {
            let message = 'translate hello to french';
            let result = await translate.getStringToTranslate(message);
            expect(result).toBe('hello');
        });
    });

    describe('Function: getTargetLanguage(message)', () => {
        it('should return desired target language from query', async () => {
            let message = 'translate hello to french';
            let result = await translate.getTargetLanguage(message);
            expect(result).toBe('french');
        });
    });

    describe('Function: getAllLanguages()', () => {
        it('should return array of all possible languages to translate to', async () => {
            let result = await translate.getAllLanguages();
            expect(result.length).toBe(104); // Number of languages
        });
    });

    describe('Function: getLanguageCode(languagesAvailable, targetLanguage)', () => {
        it('should return desired target language from query', async () => {
            let targetLanguage = 'french';
            let languagesAvailable = await translate.getAllLanguages();
            let result = await translate.getLanguageCode(languagesAvailable, targetLanguage);
            expect(result).toBe('fr');
        });

        it('should return null if target language cannot be translated to', async () => {
            let targetLanguage = 'abcd';
            let languagesAvailable = await translate.getAllLanguages();
            let result = await translate.getLanguageCode(languagesAvailable, targetLanguage);
            expect(result).toBeNull();
        })
    });

    describe('Function: translate(stringToTranslate, languageTo)', () => {
        it('should return a translated string', async () => {
            let stringToTranslate = 'hello';
            let languageTo = 'french';
            let expectedResult = `Bonjour`
            let result = await translate.translate(stringToTranslate, languageTo);
            expect(result).toBe(expectedResult);
        });

    });

    describe('Function: getResponse(message', () => {
        it('should parse an incoming query, and return a translated string', async () => {
            let message = 'translate hello to french';
            let expectedResult = `Bonjour`;
            let result = await translate.getResponse(message);
            expect(result).toBe(expectedResult);
        });
    });
});