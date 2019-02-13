const axios = require("axios");

async function getResponse(message) {
  let response;
  let query = message.toString();

  // Check if keyword "query" was used
  if (query.split(" ")[0].toUpperCase() === "QUERY") {
    let queryIndexBegin = query.toUpperCase().indexOf("QUERY") + 5;
    query = query.substring(queryIndexBegin).trim();
  }

  try {
    response = await axios.get(
      `http://api.wolframalpha.com/v1/result?appid=${process.env.WOLFRAM_APP_ID}&i=${query}`
    );
  } catch (e) {
    errorString = `Invalid query: Unfortunately TextNet isn't smart enough to figure that one out. Ask us another question! :)`
    return errorString
  }

  let result = response.data.toString().replace("Wolfram Alpha", "TextNet");
  return result;
}

module.exports = {
  getResponse
};
