const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


    let disposable = vscode.commands.registerCommand('error-help.searchStackOverFlow', async function() {
        // The code you place here will be executed every time your command is executed


        let currentlyOpenTabfile = vscode.window.activeTextEditor.document;

        const diagnostics = vscode.languages.getDiagnostics(currentlyOpenTabfile.uri)
            .filter(err => {
                console.log(err);
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
                vscode.env.openExternal(vscode.Uri.parse('http://google.com/search?q=' + selected.err.code + ' ' + selected.err.message + ' site:stackoverflow.com'));
            }



        } else {
            vscode.window.showInformationMessage('No Errors found !');
        }


    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}