const axios = require('axios');
const striptags = require('striptags');

async function getResponse(message) {
    let invalidFormattingMessage = 'Invalid direction formatting.  You\'re likely missing the "from" or "to" keywords! Texting "textnet" will return our formatting guidelines :)';

    // Trim extra spaces before and after message
    message = message.trim(); 

    // Check for validity of formatting
    messageIsValidFormat = await isValidFormat(message);
    if (!messageIsValidFormat) {
        return invalidFormattingMessage;
    }

    // Get Origin Address
    let rawOriginAddress = await getRawOriginAddress(message);
    
    // Get URI Encoded Origin Address
    let originAddress = await encodeURIComponent(rawOriginAddress);

    // Get Destination Address
    let rawDestinationAddress = await getRawDestinationAddress(message);

    // Get URI Encoded Destination Address
    let destAddress = encodeURIComponent(rawDestinationAddress);

    // Check that origin & destination have contents
    if (!originAddress || !destAddress) {
        return invalidFormattingMessage;
    }

    // Get Transportation Mode
    let transportationMode = await getTransportationMode(message);

    // Call Google API to get directions
    let response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${originAddress}&destination=${destAddress}&mode=${transportationMode}&key=${process.env.MAPS_API_KEY}`);
    
    // Parse Directions
    if (response.data.status === 'OK') {

        // Parse HTML Directions from Google API
        let resultString = await parseHTMLDirections(response);

        // Confirm transportation mode and destination at beginning of text
        let textPreface = await getTextPreface(transportationMode, rawDestinationAddress);

        // Create a string to append to text if the text is over 1000 characters long
        let trailer = "\n .... [Directions too long. Submit another request once you reach the last direction in the list]";
        
        if (resultString.length + textPreface.length + trailer.length > 1000) {
            return textPreface + " limited to 1000 chars...\n" + resultString.substr(0, 1000) + trailer;
        } else {
            return textPreface + "\n" + resultString;
        }
    } else {
        return `Directions not found :( \n Error: ${response.data.status}`;
    }
}

async function isValidFormat(message) {
    if (message.includes(" from ") == false || message.includes(" to ") == false) {
        return false;
    } else {
        return true;
    }
}

async function getRawOriginAddress(message) {
    return message.substring(message.indexOf("from") + 5, message.lastIndexOf(" to ")).trim();
}

async function getRawDestinationAddress(message) {
    return message.substring(message.lastIndexOf(" to ") + 4, message.length).trim();
}

async function getTransportationMode(message) {
    let userSelectedTransportMode = message.split(" ")[1];

    if (userSelectedTransportMode == ("walk") || userSelectedTransportMode == ("walking")) {
        return 'walking';
    } else if (userSelectedTransportMode == ("bike") || userSelectedTransportMode == ("biking")) {
        return 'bicycling';
    } else if (userSelectedTransportMode == ("transit") || userSelectedTransportMode == ("bussing")) {
        return'transit';
    } else {
        return 'driving';
    }
}

async function getTextPreface(transportationMode, rawDestinationAddress) {
    return `${transportationMode.charAt(0).toUpperCase() + transportationMode.substring(1)}` + " directions to " + `${rawDestinationAddress}`;
}

async function parseHTMLDirections(directionsAPIResponseJSON) {
    let directionResultsString = '';
    let directionList = [];
    // Multiple routes, choose the best option (0)
    // For each instruction do...
    directionsAPIResponseJSON.data.routes[0].legs[0].steps.forEach(element => {
        // Grabs HTML instructions supplied by Google and appends the distance in brackets
        let currentStepHTML = element.html_instructions + " (" + element.distance.text + ")";
        // Strips HTML tags from string (found online)
        // Used to strip <div> tags that will allow for better formatting
        let regex = /(&nbsp;|<([^>]+)>)/ig;

        // Leave <div> tags because it surrounds the destination step
        // Replace with " " for final formatting to look great on SMS
        directionList.push(striptags(currentStepHTML, ["div"]).replace(regex, " "));

        directionResultsString = directionList.join('\n\n');
    });
    return directionResultsString;
}

module.exports = {
    getResponse,
    isValidFormat,
    getRawOriginAddress,
    getRawDestinationAddress,
    getTransportationMode,
    getTextPreface,
    parseHTMLDirections
}


