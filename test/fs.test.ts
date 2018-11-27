import * as fs from '../src/fs';
import { assert } from 'chai';
import * as mock from 'mock-fs';

suite('getBasicFolderPath', () => {
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

suite('ensureExtensionFolderExists', () => {
    test('All ok', async () => {
        mock({
            '~/.vscode-standup-reporter': {},
        });
        await fs.ensureExtensionFolderExists('~/.vscode-standup-reporter');
        mock.restore();
    });

    test('Unable to create folder', async () => {
        const WITHOUT_ERROR = 'WITHOUT_ERROR';
        mock({
            '~/': mock.directory({
                mode: 0o0000,
                items: {}
            }),
        });

        try {
            await fs.ensureExtensionFolderExists('~/.vscode-standup-reporter');
            throw new Error(WITHOUT_ERROR);
        } catch (err) {
            if (err.message === WITHOUT_ERROR) {
                assert.fail('Should throw error');
            }
        } finally {
            mock.restore();
        }
    });
});
