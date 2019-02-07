const axios = require('axios');

async function getResponse(message) {
  let near_index = message.indexOf(" near ");
  let in_index =  message.indexOf(" in ");

  if(in_index > 0 && near_index === -1){
    const errMessage = "Your query is invalid, try resending the query formatted as: '" + message.substring(message.indexOf("recommend"), message.indexOf(" in ")).trim() + " 'near' " + message.substring( message.indexOf(" in ")+4)+ "'";
    return errMessage;
  }

  let input_term = encodeURIComponent(message.substring(message.indexOf("recommend") + 10, message.lastIndexOf(" near ")).trim());
  let input_location = encodeURIComponent(message.substring(message.lastIndexOf(" near ") + 6, message.length).trim());

  let yelp_req = `https://api.yelp.com/v3/businesses/search?term=${input_term}&location=${input_location}&limit=5&open_now=true`;

  let res_arr = [];
  let result = '';

  return await axios.get(yelp_req,
  {
      headers: {"Authorization" : `Bearer ${process.env.YELP_API_KEY}`}
  })
  .then((response) => {
      let count = 1;
      response.data.businesses.forEach(el => {
          let biz = {
              name: el.name,
              rating: el.rating,
              distance: `${Math.round(el.distance)} meters`,
              display_phone: el.display_phone,
              address: `${el.location.address1}, ${el.location.city} ${el.location.state}`
          };
          res_arr.push(biz);
          result += `\n\n${count}: ${biz.name} \nRating: ${biz.rating} / 5 \nDistance: ${biz.distance} \nPhone: ${biz.display_phone} \nAddress: ${biz.address}\n\n`;
          count++;
      });
  })
  .then(() => result)
  .catch(function (error) {
      console.log('error :(' + error);
  });
}

module.exports = {
    getResponse
}
