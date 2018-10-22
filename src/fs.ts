import { mkdir, readFile, PathLike } from 'fs';
import { promisify } from 'util';
import { workspace } from 'vscode';
import { join } from 'path';

enum Exceptions {
    CANNOT_CREATE_FOLDER = 'CANNOT_CREATE_FOLDER',
}

const ACCESS_RIGHTS = '0600';
const EXC_EXISTS = 'EEXIST';

export const promiseMkdir = promisify(mkdir);
// export const promiseMkdir = promisify<PathLike, number | string | undefined | null>(mkdir);
export const promiseReadFile = promisify(readFile);

export function getReportPath(date: Date) {
    const today = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    return join(getBasicFolderPath(), `${today}.report`);
}

export function getBasicFolderPath(): string {
    return workspace.getConfiguration().get('standupReporter.folder');
}

export async function ensureExtensionFolderExists(path: string) {
    try {
        await promiseMkdir(path, ACCESS_RIGHTS);
    } catch (ex) {
        if (ex.code !== EXC_EXISTS) {
            const err = new Error(`Cannot create folder to store records: ${ex.message}`);
            err.name = Exceptions.CANNOT_CREATE_FOLDER;
            throw err;
        }
    }

}
