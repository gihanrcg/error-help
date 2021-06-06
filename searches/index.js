const vscode = require('vscode');
const { SITE_NONE } = require('../constants');
const { formatGoogleLink } = require('../helperUtils/LinkUtil')
const opn = require('opn');

const allErrorsInQuickPick = async(currentlyOpenTabfile, type) => {
    const diagnostics = vscode.languages.getDiagnostics(currentlyOpenTabfile.uri)
        .filter(err => {
            return err.severity === 0;
        }).map(err => {
            let place = 'Ln ' + err.range.start.line + ' Ch ' + err.range.start.character + ' | ' + currentlyOpenTabfile.fileName;
            return {
                label: err.message,
                detail: place,
                err: err
            }
        });
    if (diagnostics && diagnostics.length > 0) {
        const selected = await vscode.window.showQuickPick(diagnostics, {
            matchOnDetail: true,
        });
        if (selected) {

            const { code, message } = selected.err;
            // vscode.env.openExternal(vscode.Uri.parse(formatGoogleLink(code, message, type)));
            opn(formatGoogleLink(code, message, type));
        }
    } else {
        vscode.window.showInformationMessage('No Errors found !');
    }
}

const webSearchText = async() => {
    const text = await vscode.window.showInputBox();
    if (text) {
        // vscode.env.openExternal(vscode.Uri.parse(formatGoogleLink("", text, SITE_NONE)));
        opn(formatGoogleLink(formatGoogleLink("", text, SITE_NONE)));
    }
}

module.exports = {
    allErrorsInQuickPick,
    webSearchText
}