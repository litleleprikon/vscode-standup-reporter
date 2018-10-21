'use strict';

import * as vscode from 'vscode';
import { ReportEventContentProvider } from './ReportEventContentProvider';
import { getReportPath } from './fs';

export function activate(context: vscode.ExtensionContext) {

    const disposable = vscode.commands.registerCommand('extension.newRecord', async () => {

        const uri = vscode.Uri.file(getReportPath(new Date())).with({
            scheme: ReportEventContentProvider.scheme
        });
        const doc = await vscode.workspace.openTextDocument(uri);
        vscode.window.showTextDocument(doc);

    });

    context.subscriptions.push(
        vscode.workspace.registerTextDocumentContentProvider(
            ReportEventContentProvider.scheme,
            new ReportEventContentProvider()));

    context.subscriptions.push(disposable);
}

export function deactivate() {
}
