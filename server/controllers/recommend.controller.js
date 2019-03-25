const axios = require('axios');

async function getResponse(message) {
    
    let isMixedUpQuery = await checkQueryMixup(message);

    if (isMixedUpQuery) {
        let fixedQuery = await fixQueryMixup(message);
        const errorMessage = "Your query is invalid, try resending the query formatted as: '" + fixedQuery + "'";
        return errorMessage;
    }

    let rawBusinessQueried = await getBusiness(message);
    let businessQueried = encodeURIComponent(rawBusinessQueried);

    let rawLocationQueried = await getLocation(message);
    let locationQueried = encodeURIComponent(rawLocationQueried);

    let yelpAPIRequest = `https://api.yelp.com/v3/businesses/search?term=${businessQueried}&location=${locationQueried}&limit=5&open_now=true`;

    let recommendationResults = '';
    let response;

    try {
        response = await axios.get(yelpAPIRequest, { 
            headers: { "Authorization": `Bearer ${process.env.YELP_API_KEY}` }
        });
        let count = 1;
        response.data.businesses.forEach(el => {
            let business = {
                name: el.name,
                rating: el.rating,
                distance: `${Math.round(el.distance)} meters`,
                displayPhone: el.displayPhone,
                address: `${el.location.address1}, ${el.location.city} ${el.location.state}`
            };
            recommendationResults += `\n\n${count}: ${business.name} \nRating: ${business.rating} / 5 \nDistance: ${business.distance} \nPhone: ${business.displayPhone} \nAddress: ${business.address}\n\n`;
            count++;
        });
        return recommendationResults;
    } catch (e) {
        return "Unable to get recommendations, it's not you, it's us </3.";
    }
}
async function getBusiness(message) {
    return message.substring(message.indexOf("recommend") + 10, message.lastIndexOf(" near ")).trim();
}

async function getLocation(message) {
    return message.substring(message.lastIndexOf(" near ") + 6, message.length).trim();
}

async function checkQueryMixup(message) {
    let indexOfNear = message.indexOf(" near ");
    let indexOfIn = message.indexOf(" in ");
    if (indexOfIn > 0 && indexOfNear === -1) {
        return true;
    }
    return false;
}

async function fixQueryMixup(message) {
    return message.substring(message.indexOf("recommend"), message.indexOf(" in ")).trim() + " 'near' " + message.substring(message.indexOf(" in ") + 4)
}

module.exports = {
    getResponse,
    getBusiness,
    getLocation,
    checkQueryMixup,
    fixQueryMixup
}
