import { IJiraAPI } from '../api/JiraAPI';
import { IEventProvider } from './EventProviderIntervace';

export class JiraEventsProvider implements IEventProvider {
    private readonly api: IJiraAPI;

    constructor(api: IJiraAPI) {
        this.api = api;
    }

    public async getEvents(): Promise<string[]> {
        const stream = await this.api.getStream();

        const entries: object[] = stream['feed'][0]['entry'];
        const result = entries.map((entry) => {
            return entry['title'][0]['_text'][0]
            // remove the profile link
                .replace(/<\s*a[^>]*href="\/secure\/ViewProfile[^>]*>(.*?)<\s*\/\s*a>/gm, '')
            // remove all HTML tags
                .replace(/<(?:.|\n)*?>/gm, '')
            // left strip, right strip
                .replace(/^\s+|\s+$/g, '')
            // replace sequences of whitespaces with exactly one
                .replace(/\s+/gm, ' ');
        });

        return result;
    }

    public getProviderName(): string {
        return 'jira';
    }

}
