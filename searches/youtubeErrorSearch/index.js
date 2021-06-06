const { SITE_YOUTUBE } = require('../../constants');
const { allErrorsInQuickPick } = require('..')

const searchInYoutube = (currentlyOpenTabfile) => {
    allErrorsInQuickPick(currentlyOpenTabfile, SITE_YOUTUBE);
}

module.exports = {
    searchInYoutube
}