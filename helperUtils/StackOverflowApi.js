const { formatStackOverflowApiKey, formatStackOverflowSearch, formatGoogleSearch } = require("./LinkUtil");
const axios = require('axios');
const vscode = require('vscode');
const opn = require('opn');

const stackOverflowApiSearch = async(searchText) => {

    if (!searchText || searchText.trim() === '') {
        return null;
    }

    const regex = /\[(.+?)\]/gm;
    let processedSearchText = searchText;
    let match;
    let searchTags = [];

    while ((match = regex.exec(processedSearchText)) !== null) {
        if (match.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        match.forEach((m, index) => {
            if (index === 0) {
                processedSearchText = processedSearchText.replace(m, "").trim();
            } else if (index === 1) {
                searchTags.push(m);
            }
        });
    }
    const stackoverflowApiKey = 'n5E2Yl989XPdQpjT6qCedQ((';
    const encodedTagsString = encodeURIComponent(searchTags.join(';'));
    const encodedAPISearchTerm = encodeURIComponent(processedSearchText);

    const apiSearchUrl = formatStackOverflowApiKey(encodedAPISearchTerm, encodedTagsString, stackoverflowApiKey);

    const questionsMeta = [
        { title: `🔎 Search Stackoverflow: ${searchText}`, url: formatStackOverflowSearch(searchText) },
        { title: `🔎 Search Google: ${searchText}`, url: formatGoogleSearch(searchText) },

    ];

    const result = await axios.default.get(apiSearchUrl);
    if (result) {
        const { items } = result.data;
        if (items && items.length > 0) {
            items.forEach((question, index) => {
                questionsMeta.push({
                    title: `${index+1} ⛳${question.score} ${question.is_answered ? '✔' : '😕'}-${question.title} 🏷️ [${question.tags.join('|')}`,
                    url: question.link
                })
            })
        } else return null;
    } else return null;

    const questionTitles = questionsMeta.map(question => question.title)
    const selectedTitle = await vscode.window.showQuickPick(questionTitles, { canPickMany: false });
    if (selectedTitle) {
        const selectedQuestionMeta = questionsMeta.find(q => q.title === selectedTitle);
        const selectedQuestionUrl = selectedQuestionMeta ? selectedQuestionMeta.url : '';
        if (selectedQuestionUrl) {
            opn(selectedQuestionUrl);
        }
    }

}
module.exports = {
    stackOverflowApiSearch
}