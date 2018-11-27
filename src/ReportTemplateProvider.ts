import { getBasicFolderPath, IFileSystem } from './fs';
import { resolve } from 'path';


class ReportTemplateProvider {
    private readonly fs: IFileSystem;

    constructor(fs: IFileSystem) {
        this.fs = fs;
    }

    ensureTemplateExists() {
        const templatePath = resolve(getBasicFolderPath(), '.template');

        return
    }
}
