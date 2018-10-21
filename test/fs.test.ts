import * as fs from '../src/fs';
import { assert } from 'chai';

suite('fs.ts tests', () => {
    test('getBasicFolderPath', () => {
        const path = fs.getBasicFolderPath();
        assert.equal(path, '~/.vscode-standup-reporter');
    });
    test('getReportPath', () => {
        const date = new Date(1971, 1, 1);
        const path = fs.getReportPath(date);
        assert.equal(path, '~/.vscode-standup-reporter/1-1-1971.report');
    });
});
