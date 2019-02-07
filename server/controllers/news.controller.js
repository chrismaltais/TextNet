const axios = require('axios')

async function getResponse() {
  let res = [];
  let err_msg = "Sorry cannot find news right now.  It's not you, it's us </3";
  let response = await axios.get(`https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=${process.env.NEWS_KEY}`).catch(function (error) {
    console.log(error);
  });

  if(response.status != 200){
    return err_msg;
  }

  for (var i = 0; i < 5; i++) {
    res.push(`${response.data.articles[i].title} \n ${response.data.articles[i].description} \n\n`);
  }

  return res.join('');
}

module.exports = {
  getResponse
};
