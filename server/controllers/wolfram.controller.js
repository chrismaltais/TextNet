const axios = require("axios");

async function getResponse(message) {
  let response;
  let query = message.toString();

  if(query.split(" ")[0].toUpperCase() === "QUERY"){
    let idx_to_split = query.toUpperCase().indexOf("QUERY") + 5;
    query = query.substring(idx_to_split).trim();
    console.log('query keyword found idx: ', idx_to_split);
  }
  console.log(query);
  try {
    response = await axios.get(
      `http://api.wolframalpha.com/v1/result?appid=WLAQQ9-YP923PK67P&i=${query}`
    );
  } catch (e) {
    errorString = `Invalid query: Unfortunately TextNet isn't smart enough to figure that one out. Ask us another question! :)`
    return  errorString
  }

  let result = response.data.toString().replace("Wolfram Alpha", "TextNet");
  return result;
}

module.exports = {
  getResponse
};
