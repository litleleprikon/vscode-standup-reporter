import { Event, TextDocumentContentProvider, Uri, CancellationToken, ProviderResult } from 'vscode';
import { join } from 'path';

export class ReportEventContentProvider implements TextDocumentContentProvider {
    public onDidChange?: Event<Uri> | undefined;
    public static readonly scheme = 'daily-standup-record';

    public provideTextDocumentContent(uri: Uri, token: CancellationToken): ProviderResult<string> {
        return ['Recently:', '*', 'Next', '*', 'End'].join('\n');
    }
}
