async function parse(message) {
    message = message.toUpperCase();

    const wordsInMessage = message.split(" ");

    if(wordsInMessage[0] ==="WHO" ||
        wordsInMessage[0]==="WHAT" ||
        wordsInMessage[0]==="WHERE" ||
        wordsInMessage[0]==="HOW"||
        wordsInMessage[0]==="WHY"||
        wordsInMessage[0]==="WHEN" ||
        wordsInMessage[0]==="QUERY") {
        return "WOLFRAM_QUERY";
    } else if(wordsInMessage[0] ==="TRANSLATE") {
        return "TRANSLATE_QUERY";
    } else if(wordsInMessage[0] ==="NEWS") {
        return "NEWS_QUERY";
    } else if(wordsInMessage[0] ==="TEXTNET") {
        return "TEXTNET_HELP_QUERY";
    } else if(wordsInMessage[0] ==="DIRECTIONS") {
        return "DIRECTIONS_QUERY";
    } else if(wordsInMessage[0] ==="RECOMMEND") {
        return "RECOMMEND_QUERY";
    } else {
        return "INVALID_QUERY";
    }
}

module.exports = {
    parse
}
