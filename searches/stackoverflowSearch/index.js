const { SITE_STACKOVERFLOW } = require('../../constants');
const { allErrorsInQuickPick } = require('../')

const searchInStackOverflow = (currentlyOpenTabfile) => {
    allErrorsInQuickPick(currentlyOpenTabfile, SITE_STACKOVERFLOW);
}

module.exports = {
    searchInStackOverflow
}