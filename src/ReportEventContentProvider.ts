import { Event, TextDocumentContentProvider, Uri, CancellationToken, ProviderResult, workspace } from 'vscode';
import { template } from 'lodash';
import { IEventProvider } from './data-providers/event-providers/EventProviderIntervace';

export class ReportEventContentProvider implements TextDocumentContentProvider {
    public onDidChange?: Event<Uri> | undefined;
    public static readonly scheme = 'daily-standup-record';
    private static readonly templateName = '.template';
    private providers: IEventProvider[];

    constructor(providers: IEventProvider[] = []) {
        this.providers = providers;
    }

    public provideTextDocumentContent(uri: Uri, token: CancellationToken): ProviderResult<string> {
        return ['Recently:', '*', 'Next', '*', 'End'].join('\n');
    }

    public checkTemplate() {
        workspace.getConfiguration().get('standupReporter.folder');
    }

    public async loadTemplate(): Promise<string> {
        return '';
    }

}
