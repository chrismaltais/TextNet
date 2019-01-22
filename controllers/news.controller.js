async function getResponse(message) {
  axios
    .get(
      `https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=e7817483252a45378feffdb9cda39573`
    )
    .then(function(response) {
      for (var i = 0; i < 5; i++) {
        res.push(
          `${response.data.articles[i].title} \n ${
            response.data.articles[i].description
          } \n\n`
        );
      }
    })
    .then(() => {
      return res.join("");
    })
    .catch(function(error) {
      console.log(error);
    });
}

module.exports = {
  getResponse
};
