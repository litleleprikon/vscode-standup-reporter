'use strict';
import * as fs from 'fs';
import { promisify } from 'util';
import { homedir } from 'os';
import { join } from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    const disposable = vscode.commands.registerCommand('extension.newRecord', async () => {

        try {
            const mkdir = await promisify<fs.PathLike, number | string | undefined | null>(fs.mkdir);
            mkdir(ReportEventContentProvider.basicPath, '0777');
        } catch (ex) {
            if (ex.code !== 'EEXIST') {
                await vscode.window.showErrorMessage(`Cannot create folder to store records: ${ex.message}`);
            }
        }

        const uri = vscode.Uri.file(ReportEventContentProvider.getReportPath()).with({
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

class ReportEventContentProvider implements vscode.TextDocumentContentProvider {
    public onDidChange?: vscode.Event<vscode.Uri> | undefined;
    public static readonly scheme = 'daily-standup-record';
    public static readonly basicPath = join(homedir(), '.vscode-standup-reporter');

    public static getReportPath(): string {
        const today = (new Date()).toISOString();
        return join(ReportEventContentProvider.basicPath, `${today}.report`);
    }

    public provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): vscode.ProviderResult<string> {
        return ['Recently:', '*', 'Next', '*', 'End'].join('\n');
    }
}
