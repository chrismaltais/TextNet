// Handle env vars
const path = require('path');
let envPath = path.join(__dirname + '../../.env');
require('dotenv').config({path: envPath});;

const axios = require('axios');
const {directions} = require('./../controllers');
const {directionsAssert} = require('./assertion_data');

describe('Directions Controller:', () => {
    describe('Function: getResponse()', () => {
        it('should return the directions given correct format', async () => {

        });
    });

    describe('Function: isValidFormat(query)', () => {
        it('should return false if query does not include \'from\' keyword', async () => {
            let query = 'directions to Queens University';
            let result = await directions.isValidFormat(query);
            expect(result).toBeFalsy();
        });

        it('should return false if query does not include \'to\' keyword', async () => {
            let query = 'directions from Queens University';
            let result = await directions.isValidFormat(query);
            expect(result).toBeFalsy();
        });

        it('should return true if query includes \'to\' and \'from\' keyword', async () => {
            let query = 'directions to Queens University from 199 William Street';
            let result = await directions.isValidFormat(query);
            expect(result).toBeTruthy();
        });
    });

    describe('Function: getRawOriginAddress(query)', () => {
        it('should return the location of the specified origin if \'from\' keyword is before \'to\'', async () => {
            let query = 'directions from Queens University to 199 William Street';
            let origin = 'Queens University'
            let result = await directions.getRawOriginAddress(query);
            expect(result).toBe(origin);
        });
    });

    describe('Function: getRawDestinationAddress(query)', () => {
        it('should return the location of the specified destination if \'from\' keyword is before \'to\'', async () => {
            let query = 'directions from Queens University to 199 William Street';
            let destination = '199 William Street'
            let result = await directions.getRawDestinationAddress(query);
            expect(result).toBe(destination);
        });
    });

    describe('Function: getTransportationMode(query)', () => {
        it('should return \'walking\' if query specifies walking as the mode of transportation', async () => {
            let query = 'directions walking from Queens University to 199 William Street';
            let transportationMode = 'walking'
            let result = await directions.getTransportationMode(query);
            expect(result).toBe(transportationMode);
        });

        it('should return \'bicycling\' if query specifies biking as the mode of transportation', async () => {
            let query = 'directions biking from Queens University to 199 William Street';
            let transportationMode = 'bicycling'
            let result = await directions.getTransportationMode(query);
            expect(result).toBe(transportationMode);
        });

        it('should return \'transit\' if query specifies bussing as the mode of transportation', async () => {
            let query = 'directions bussing from Queens University to 199 William Street';
            let transportationMode = 'transit'
            let result = await directions.getTransportationMode(query);
            expect(result).toBe(transportationMode);
        });

        it('should return \'driving\' if query does not specify a mode of transportation', async () => {
            let query = 'directions from Queens University to 199 William Street';
            let transportationMode = 'driving'
            let result = await directions.getTransportationMode(query);
            expect(result).toBe(transportationMode);
        });
    });

    describe('Function: getTextPreface(transportationMode, rawDestinationAddress)', () => {
        it('should return a formatted preface to confirm how the user is getting to the specified destination', async () => {
            let destination = '199 William Street';
            let transportationMode = 'driving';
            let textPreface = 'Driving directions to 199 William Street'
            let result = await directions.getTextPreface(transportationMode, destination);
            expect(result).toBe(textPreface);
        });
    });

    describe('Function: parseHTMLDirections(directionsAPIResponseJSON)', () => {
        it('should return list of directions that are formatted for SMS', async () => {
            let originAddress = directionsAssert.parseHTMLDirections.origin;
            let destAddress = directionsAssert.parseHTMLDirections.destination;
            let transportationMode = directionsAssert.parseHTMLDirections.transportationMode;
            let expectedResult = directionsAssert.parseHTMLDirections.result;
            let response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${originAddress}&destination=${destAddress}&mode=${transportationMode}&key=${process.env.MAPS_API_KEY}`);
            let directionsList = await directions.parseHTMLDirections(response);
            expect(directionsList).toBe(expectedResult);
        });
    });

    describe('Function: getResponse(message)', () => {
        it('should return list of directions that are formatted for SMS including text preface, given just a message', async () => {
            let message = directionsAssert.correctQuery;
            let directionResults = await directions.getResponse(message);
            expect(directionResults).toBe(directionsAssert.getResponse.result);
        });
    });

});