const vscode = require('vscode');
const { searchInGoogle } = require('./searches/googleErrorSearch');
const { searchInYoutube } = require('./searches/youtubeErrorSearch');
const { searchInStackOverflow } = require('./searches/stackoverflowErrorSearch');
const { searchInGithub } = require('./searches/githubErrorSearch');
const { webSearchText } = require('./searches');
const { getSelectedText } = require('./helperUtils/VsCodeUtils');
const { stackOverflowApiSearch } = require('./helperUtils/StackOverflowApi')

/**
 * @param {vscode.ExtensionContext} context
 */
const activate = (context) => {
    context.subscriptions.push(
        vscode.commands.registerCommand('error-help.searchGoogle', () => {
            let currentlyOpenTabfile = vscode.window.activeTextEditor.document;
            searchInGoogle(currentlyOpenTabfile);
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand('error-help.searchYoutube', () => {
            let currentlyOpenTabfile = vscode.window.activeTextEditor.document;
            searchInYoutube(currentlyOpenTabfile);
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand('error-help.searchStackOverflow', () => {
            let currentlyOpenTabfile = vscode.window.activeTextEditor.document;
            searchInStackOverflow(currentlyOpenTabfile);
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand('error-help.searchGithub', () => {
            let currentlyOpenTabfile = vscode.window.activeTextEditor.document;
            searchInGithub(currentlyOpenTabfile);
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand('error-help.webSearch', () => {
            webSearchText();
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand('error-help.stackOverflowAPI', () => {
            stackOverflowApiSearch(getSelectedText())
        })
    );
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}