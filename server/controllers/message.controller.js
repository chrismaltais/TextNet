async function parse(message) {
    message = message.toUpperCase();

    const messageArr = message.split(" ");

      if(messageArr[0] ==="WHO" ||
          messageArr[0]==="WHAT" ||
          messageArr[0]==="WHERE" ||
          messageArr[0]==="HOW"||
          messageArr[0]==="WHY"||
          messageArr[0]==="WHEN") {
          return "WOLFRAM_QUERY";
          }
    else if(messageArr[0] ==="TRANSLATE"){
        return "TRANSLATE_QUERY";
    }
    else if(messageArr[0] ==="NEWS"){
        return "NEWS_QUERY";
    }
    else if(messageArr[0] ==="TEXTNET"){
        return "TEXTNET_HELP_QUERY";
    }
    else if(messageArr[0] ==="DIRECTIONS"){
        return "DIRECTIONS_QUERY";
    }
    else if(messageArr[0] ==="RECOMMEND"){
        return "RECOMMEND_QUERY";
    }
    else{
        return "INVALID_QUERY";
    }

}

module.exports = {
    parse
}
