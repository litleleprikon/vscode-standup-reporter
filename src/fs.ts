import { mkdir, readFile, PathLike } from 'fs';
import { promisify } from 'util';
import { workspace } from 'vscode';
import { join } from 'path';
import { URL } from 'url';

enum Exceptions {
    CANNOT_CREATE_FOLDER = 'CANNOT_CREATE_FOLDER',
}

export interface IFileSystem {
    mkdir(path: PathLike, mode?: string | number): Promise<void>;
    readFile(path: string | number | Buffer | URL, options?: {
        encoding?: null;
        flag?: string;
    }): Promise<Buffer>;

    ensureExtensionFolderExists(path: string): Promise<void>;
}

export class FileSystem implements IFileSystem {
    private readonly ACCESS_RIGHTS = '0600';
    private readonly EXC_EXISTS = 'EEXIST';

    public readonly mkdir = promisify(mkdir);
    public readonly readFile = promisify(readFile);

    public async ensureFolderExists(path: string): Promise<void> {
        try {
            await this.mkdir(path, ACCESS_RIGHTS);
        } catch (ex) {
            if (ex.code !== EXC_EXISTS) {
                const err = new Error(`Cannot create folder to store records: ${ex.message}`);
                err.name = Exceptions.CANNOT_CREATE_FOLDER;
                throw err;
            }
        }
    }

    public async ensureExtensionFolderExists(path: string): Promise<void> {
        try {
            await this.mkdir(path, ACCESS_RIGHTS);
        } catch (ex) {
            if (ex.code !== EXC_EXISTS) {
                const err = new Error(`Cannot create folder to store records: ${ex.message}`);
                err.name = Exceptions.CANNOT_CREATE_FOLDER;
                throw err;
            }
        }

    }

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

export async function ensureExtensionFolderExists(path: string): Promise<void> {
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
