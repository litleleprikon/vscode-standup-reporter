import * as fs from '../src/fs';
import { assert } from 'chai';

suite('getBasicFolderPath tests', () => {
    test('default', () => {
        const path = fs.getBasicFolderPath();
        assert.equal(path, '~/.vscode-standup-reporter');
    });
});

suite('getReportPath', () => {
    test('path for start of epoch', () => {
        const date = new Date(1971, 1, 1);
        const path = fs.getReportPath(date);
        assert.equal(path, '~/.vscode-standup-reporter/1-1-1971.report');
    });
});
