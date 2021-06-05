const vscode = require('vscode');
const { formatGoogleLink } = require('../helperUtils/LinkUtil')

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
            vscode.env.openExternal(vscode.Uri.parse(formatGoogleLink(code, message, type)));
        }
    } else {
        vscode.window.showInformationMessage('No Errors found !');
    }
}

module.exports = {
    allErrorsInQuickPick
}