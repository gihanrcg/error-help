const { SITE_GITHUB } = require('../../constants');
const { allErrorsInQuickPick } = require('..')

const searchInGithub = (currentlyOpenTabfile) => {
    allErrorsInQuickPick(currentlyOpenTabfile, SITE_GITHUB);
}

module.exports = {
    searchInGithub
}