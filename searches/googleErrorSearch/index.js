const { SITE_NONE } = require('../../constants');
const { allErrorsInQuickPick } = require('..')

const searchInGoogle = (currentlyOpenTabfile) => {
    allErrorsInQuickPick(currentlyOpenTabfile, SITE_NONE);
}

module.exports = {
    searchInGoogle
}