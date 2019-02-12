const axios = require('axios');

async function getResponse(message) {
    let indexOfNear = message.indexOf(" near ");
    let indexOfIn = message.indexOf(" in ");

    if (indexOfIn > 0 && indexOfNear === -1) {
        const errorMessage = "Your query is invalid, try resending the query formatted as: '" + message.substring(message.indexOf("recommend"), message.indexOf(" in ")).trim() + " 'near' " + message.substring(message.indexOf(" in ") + 4) + "'";
        return errorMessage;
    }

    let businessQueried = encodeURIComponent(message.substring(message.indexOf("recommend") + 10, message.lastIndexOf(" near ")).trim());
    let locationQueried = encodeURIComponent(message.substring(message.lastIndexOf(" near ") + 6, message.length).trim());

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

module.exports = {
    getResponse
}
