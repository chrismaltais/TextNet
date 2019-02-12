const axios = require('axios')

async function getResponse() {
  let newsResults = [];
  let errorMessage = "Unable to find top news headlines right now.  It's not you, it's us </3";
  let response;
  try {
    response = await axios.get(`https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=${process.env.NEWS_KEY}`)
  } catch (e) {
    return errorMessage;
  }

  for (var i = 0; i < 5; i++) {
    newsResults.push(`${response.data.articles[i].title} \n ${response.data.articles[i].description} \n\n`);
  }

  return newsResults.join('');
}

module.exports = {
  getResponse
};
