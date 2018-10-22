import { assert } from 'chai';
import { promiseReadFile } from '../../../src/fs';
import { createAxiosInstance, JiraAPI } from '../../../src/data-providers/api/JiraAPI';
import { workspace, ConfigurationTarget } from 'vscode';
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { resolve } from 'path';

suite('JiraAPI', async () => {
    test('getStream', async () => {
        const axios = Axios.create();
        axios.get = async (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> => {
            const data = await promiseReadFile(resolve(
                __dirname,
                `../../../../test/test-data/jira.xml`));
            return {
                data: data.toString(),
                status: 200,
                statusText: 'Ok',
                headers: '',
                config,
            };
        };

        const api = new JiraAPI(axios);
        const stream = await api.getStream();

        assert.hasAllKeys(stream, ['feed']);
    });

});

suite('createAxiosInstance', () => {
    test('Check base URL', async () => {
        const axiosInstance = createAxiosInstance();
        assert.equal(axiosInstance.defaults.baseURL, 'studio.atlassian.com', 'Wrong base URL');
    });
});
