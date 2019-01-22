const axios = require('axios')

async function getResponse() {
  let res = [];
  let response = await axios.get(`https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=e7817483252a45378feffdb9cda39573`);

  for (var i = 0; i < 5; i++) {
    res.push(`${response.data.articles[i].title} \n ${response.data.articles[i].description} \n\n`);
  }

  return res.join('');
}

module.exports = {
  getResponse
};
