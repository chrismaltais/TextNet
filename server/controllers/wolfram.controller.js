const axios = require("axios");

async function getResponse(message) {
  let response;
  try {
    response = await axios.get(
      `http://api.wolframalpha.com/v1/result?appid=WLAQQ9-YP923PK67P&i=${message}`
    );
  } catch (e) {
    errorString = `Invalid query: Unfortunately TextNet isn't smart enough to figure that one out. Ask us another question! :)`
    return  errorString
  }

  let result = response.data.replace("Wolfram|Alpha", "TextNet");
  return result;
}

module.exports = {
  getResponse
};
