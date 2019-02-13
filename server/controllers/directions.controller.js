const axios = require('axios');
const striptags = require('striptags');

async function getResponse(message) {
    let resultString = '';
    let invalidFormattingMessage = 'Invalid direction formatting.  You\'re likely missing the "from" or "to" keywords! Texting "textnet" will return our formatting guidelines :)';
    let directionList = [];
    // Check for validity of formatting
    if (message.includes(" from ") == false || message.includes(" to ") == false) {
        return invalidFormattingMessage;
    }

    message = message.trim(); // trim extra spaces

    let originAddrRaw = message.substring(message.indexOf("from") + 5, message.lastIndexOf(" to ")).trim();
    let originAddress = encodeURIComponent(originAddrRaw);

    let destAddressRaw = message.substring(message.lastIndexOf(" to ") + 4, message.length).trim();
    let destAddress = encodeURIComponent(destAddressRaw);

    // Check that origin & destination have contents
    if (!originAddress || !destAddress) {
        return invalidFormattingMessage;
    }

    console.log(`Directions - Origin: ${originAddrRaw}, Destination: ${destAddressRaw}`);

    let transportationMode = 'driving';

    let userSelectedTransportMode = message.split(" ")[1];

    if (userSelectedTransportMode == ("walk") || userSelectedTransportMode == ("walking")) {
        transportationMode = 'walking';
    } else if (userSelectedTransportMode == ("bike") || userSelectedTransportMode == ("biking")) {
        transportationMode = 'bicycling';
    } else if (userSelectedTransportMode == ("transit") || userSelectedTransportMode == ("bus")) {
        transportationMode = 'transit';
    } else {
        transportationMode = 'driving';
    }

    let response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${originAddress}&destination=${destAddress}&mode=${transportationMode}&key=${process.env.MAPS_API_KEY}`)
    //Parse Directions
    if (response.data.status === 'OK') {

        // Multiple routes, choose the best option (0)
        // For each instruction do...
        response.data.routes[0].legs[0].steps.forEach(element => {
            // Grabs HTML instructions supplied by Google and appends the distance in brackets
            let currentStepHTML = element.html_instructions + " (" + element.distance.text + ")";
            // Strips HTML tags from string (found online)
            // Used to strip <div> tags that will allow for better formatting
            let regex = /(&nbsp;|<([^>]+)>)/ig;

            // Leave <div> tags because it surrounds the destination step
            // Replace with " " for final formatting to look great on SMS
            directionList.push(striptags(currentStepHTML, ["div"]).replace(regex, " "));

            resultString = directionList.join('\n\n');
        });

        // Confirm transportation mode and destination at beginning of text
        let textPreface = `${transportationMode.charAt(0).toUpperCase() + transportationMode.substring(1)}` + " directions to " + `${destAddressRaw}`;

        // Create a string to append to text if the text is over 1000 characters long
        let trailer = "\n .... [Directions too long. Submit another request once you reach the last direction in the list]";
        
        if (resultString.length + textPreface.length + trailer.length > 1000) {
            return textPreface + " limited to 1000 chars...\n" + resultString.substr(0, 1000) + trailer;
        } else {
            return textPreface + "\n" + resultString;
        }
    } else {
        return "Directions not found :( \nPlease check your formatting.";
    }
}

module.exports = {
    getResponse
}


