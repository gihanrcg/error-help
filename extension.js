const vscode = require('vscode');
const { searchInGoogle } = require('./searches/googleSearch');
const { searchInYoutube } = require('./searches/youtubeSearch');
const { searchInStackOverflow } = require('./searches/stackoverflowSearch');
const { searchInGithub } = require('./searches/githubSearch');


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
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}