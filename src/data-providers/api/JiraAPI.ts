import { workspace } from 'vscode';
import Axios, { AxiosInstance } from 'axios';
import { xml2js } from 'xml-js';
import { dayBefore } from '../../utils';

export interface IJiraAPI {
    getStream(): object;
}

export function createAxiosInstance(): AxiosInstance {
    return Axios.create({
        baseURL: workspace.getConfiguration().get('standupReporter.jira.host')
    });
}

export class JiraAPI implements IJiraAPI {
    private readonly http: AxiosInstance;
    private readonly user: string;
    private readonly maxResults = 100;

    constructor(http: AxiosInstance) {
        this.http = http;
        this.user = workspace.getConfiguration().get('standupReporter.jira.user');
    }

    public getStreamUrl(): string {
        const yesterday = dayBefore(new Date());
        const path = `plugins/servlet/streams`;
        const maxResults = `\?maxResults\=${this.maxResults}`;
        const relativeLInks = `\&relativeLinks\=true`;
        const user = `user+IS+${this.user}`;
        const date = `update-date+AFTER+${yesterday.getTime()}`;
        const streams = `\&streams\=${user}\&${date}`;
        const url = `${path}${maxResults}${relativeLInks}${streams}`;
        return url;
    }

    public async getStream(): Promise<object> {
        const url = this.getStreamUrl();
        const response = await this.http.get(url);
        const result = xml2js(response.data, {
            compact: true,
            alwaysArray: true,
            alwaysChildren: true
        });
        return result;
    }

}
