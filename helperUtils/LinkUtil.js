const { GOOGLE_SEARCH_LINK } = require("../constants");

const formatGoogleLink = (errorCode, errorMessage, siteConst) => {
    return GOOGLE_SEARCH_LINK + '' + errorCode + ' ' + errorMessage + ' ' + siteConst
}

const formatStackOverflowApiKey = (encodedAPISearchTerm, encodedTagsString, stackoverflowApiKey) => {
    return `https://api.stackexchange.com/2.2/search?order=desc&sort=relevance&intitle=${encodedAPISearchTerm}&tagged=${encodedTagsString}&site=stackoverflow&key=${stackoverflowApiKey}`
}
const formatStackOverflowSearch = (searchTerm) => {
    return `https://stackoverflow.com/search?q=${encodeURIComponent(searchTerm)}`;
}
const formatGoogleSearch = (searchTerm) => {
    return `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
}

module.exports = {
    formatGoogleLink,
    formatStackOverflowApiKey,
    formatStackOverflowSearch,
    formatGoogleSearch
}