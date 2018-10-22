import { assert } from 'chai';
import { IJiraAPI } from '../../../src/data-providers/api/JiraAPI';
import { promiseReadFile } from '../../../src/fs';
import { resolve } from 'path';
import { xml2js } from 'xml-js';
import { JiraEventsProvider } from '../../../src/data-providers/event-providers/JiraEventsProvider';

class JiraAPIMock implements IJiraAPI {
    public async getStream(): Promise<object> {
        const data = await promiseReadFile(resolve(
            __dirname,
            `../../../../test/test-data/jira.xml`));
        return xml2js(data.toString(), {
            compact: true,
            alwaysArray: true,
            alwaysChildren: true
        });
    }
}

suite('JiraEventsProvider', () => {
    test('getEvents', async () => {
        const provider = new JiraEventsProvider(new JiraAPIMock());

        const events = await provider.getEvents();
        assert.lengthOf(events, 2);
        assert.deepEqual(events, [
            'changed the status to Merged on TASK-0000 - Task',
            'changed the status to Merged on TASK-0000 - Task'
        ]);
    });

    test('getProviderName', () => {
        const provider = new JiraEventsProvider(new JiraAPIMock());

        assert.equal(provider.getProviderName(), 'jira');
    });
});
