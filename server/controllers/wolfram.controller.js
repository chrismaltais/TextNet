const axios = require("axios");

async function getResponse(message) {
  let response = await axios.get(
    `http://api.wolframalpha.com/v1/result?appid=WLAQQ9-YP923PK67P&i=${message}`
  );

  let result = response.data.replace("Wolfram Alpha", "TextNet");;
  return result;
}

module.exports = {
  getResponse
};
