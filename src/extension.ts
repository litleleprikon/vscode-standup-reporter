'use strict';

import { ReportEventContentProvider } from './ReportEventContentProvider';
import * as vscode from 'vscode';
import { newRecord } from './commands';

export function activate(context: vscode.ExtensionContext) {

    const disposable = vscode.commands.registerCommand('extension.newRecord', newRecord);

    context.subscriptions.push(
        vscode.workspace.registerTextDocumentContentProvider(
            ReportEventContentProvider.scheme,
            new ReportEventContentProvider()));

    context.subscriptions.push(disposable);
}

export function deactivate() {
}
