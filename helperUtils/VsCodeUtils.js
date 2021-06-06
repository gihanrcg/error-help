const vscode = require('vscode');
const { logError } = require('./logger');

const getSelectedText = () => {
    const editorWindow = vscode.window.activeTextEditor;
    if (!editorWindow) {
        logError('Invalid Editor Window');
    }
    const { document, selections } = editorWindow;

    const eol = document.eol === 1 ? '\n' : '\r\n';
    const selectedLines = selections.map(select => {
        if (select.start.line === select.end.line && select.start.character === select.end.character) {
            const text = document.getText(document.lineAt(select.start).range);
            return `${text}${eol}`;
        }
        return document.getText(select);
    });

    return selectedLines[0].trim();
}

module.exports = {
    getSelectedText
}