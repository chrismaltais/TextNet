async function getResponse() {
    let message = [
        `--- TextNet Help ---`,
        '\n1. "textnet" - returns lists of available functions',
        '\n\n2. "directions" - format: "directions [walking | driving | transit | biking] from [source] to [destination]"',
        '\n\n3. "translate" - format: "translate [string to translate] to [target language]"',
        '\n\n4. "recommend" - format: "recommend [business] near [location]"\
                \nBusiness - for example "food" or "restaurants". The term may also be business names, such as "Starbucks\
                \nLocation, for example "New York City", "NYC", "350 5th Ave,"',
        '\n\n6. "query" - format: "[who | what | where | why | when] [any question]'
      ].join("\n");
}

module.exports = {
    getResponse
}