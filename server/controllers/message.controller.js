async function parse(message) {
    message = message.toUpperCase();
    if(message.includes("WHO") || message.includes("WHAT") || message.includes("WHERE") || message.includes("HOW")|| message.includes("WHY") || message.includes("WHEN")){
      return "WOLFRAM_QUERY";
    }
    else if(message.includes("TRANSLATE")){
      return "TRANSLATE_QUERY";
    }
    else if(message.includes("NEWS")){
      return "NEWS_QUERY";
    }
    else if(message.includes("TEXTNET")){
      return "TEXTNET_HELP_QUERY";
    }
    else if(message.includes("DIRECTIONS")){
      return "DIRECTIONS_QUERY";
    }
    else{
      return message;
    }
}

module.exports = {
    parse
}
