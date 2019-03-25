validQuery = 'recommend coffee shops near Kingston, ON';
mixedUpQuery = 'recommend coffee shops in Kingston, ON';
fixedQuery = 'recommend coffee shops \'near\' Kingston, ON';
fixedQueryError = "Your query is invalid, try resending the query formatted as: '" + fixedQuery + "'";
invalidQuery = 'recommend coffee shops';

getResponse = {
    validQuery: 'recommend coffee shops near Kingston, ON',
    invalidQuery: 'recommend coffee shops',
    mixedUpQuery: 'recommend coffee shops in Kingston, ON',
    result: 'idk'
}

module.exports = {
    getResponse,
    mixedUpQuery,
    fixedQueryError
}