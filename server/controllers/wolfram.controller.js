const axios = require("axios");

async function getResponse(message) {
  let res = [];
  let response = await axios.get(
    `http://api.wolframalpha.com/v1/result?appid=WLAQQ9-YP923PK67P&i=${message}`
  );

  return response.data;
}

module.exports = {
  getResponse
};
