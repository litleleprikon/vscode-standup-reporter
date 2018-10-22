import { Uri, workspace, window } from 'vscode';
import { getReportPath } from './fs';
import { ReportEventContentProvider } from './ReportEventContentProvider';

export async function newRecord() {
    const uri = Uri.file(getReportPath(new Date())).with({
        scheme: ReportEventContentProvider.scheme
    });
    const doc = await workspace.openTextDocument(uri);
    window.showTextDocument(doc);

}
