const { GOOGLE_SEARCH_LINK } = require("../constants");

const formatGoogleLink = (errorCode, errorMessage, siteConst) => {
    return GOOGLE_SEARCH_LINK + '' + errorCode + ' ' + errorMessage + ' ' + siteConst
}

module.exports = {
    formatGoogleLink
}