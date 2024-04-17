import { execa } from 'execa';
import { https } from "follow-redirects";
import extract from "extract-zip";
import path from "path";
import fsExtra from "fs-extra";
import { loadEnv } from 'vite'

const env = loadEnv(process.env.NODE_ENV ?? "", process.cwd(), '');

const downloadRepoArchive = (url, dest): Promise<string> => {
    return new Promise((resolve, reject) => {

        const file = fsExtra.createWriteStream(dest);

        https.get(url, function (response) {
            response.pipe(file);
            file.on('finish', function () {
                file.close();  // close() is async, call cb after close completes.
                resolve(getPath(dest));
            });
        }).on('error', function (err) { // Handle errors
            fsExtra.unlink(dest); // Delete the file async. (But we don't check the result)
            reject(err)
        });
    })
};

const getPath = (relative: string) => {
    return path.join(__dirname, relative);
}

const fixImportsInProtoFiles = (fileName: string) => {
    const filePath = getPath('./contracts/' + fileName);
    const fileContent = fsExtra.readFileSync(filePath).toString();
    let newContent = "";

    if (fileName === "sandbox.proto") {
        const searchRegExp = /import \"/gm;
        newContent = fileContent.replace(searchRegExp, "import \"contracts/")
    }
    else {
        newContent = fileContent.replace("common.proto", "contracts/common.proto")
    }

    fsExtra.writeFileSync(filePath, newContent);
}

/**
 * remove proto and fix exportos in ts files
 */
const removeProtoAndFixTs = (fileName: string) => {
    const filePath = path.join(__dirname, './contracts/' + fileName);

    if (fileName.endsWith(".proto")) {
        fsExtra.remove(filePath);
    }
    else if (fileName.endsWith(".ts")) {
        const fileContent = fsExtra.readFileSync(filePath).toString();

        //fixing ts files
        let newContent = fileContent;

        //fixing enums
        const regexpForEnumSplit = /\n  /gm;
        const splitedByEnum = fileContent.split(regexpForEnumSplit).filter(string => string.match(/\w{1,}( = [-][\d]| = [\d]{1,})/gm));

        for (let string of splitedByEnum) {
            //:ENUM_DEFENITION = 1
            const enumRow = string.match(/\w{1,}( = [-][\d]| = [\d]{1,})/gm);

            //cleared enum row: ENUM_DEFENITION = 1
            enumRow && (string = string.replace(string, enumRow.toString()))

            //only enum defenition: ENUM_DEFENITION
            const definition = string.replace(/ (.*)/gm, "");
            newContent = newContent.replace(string, `${definition} = "${definition}"`);
        }

        //fixing exports/imports
        newContent = newContent.replace('export const protobufPackage = "tinkoff.public.invest.api.contract.v1";', "");
        newContent = newContent.replace('/* eslint-disable */\n', "");
        newContent = newContent.replace('\n\n', '')
        newContent = newContent.replace('rxjs', '../Observable')
        fsExtra.writeFile(filePath, newContent);
    }
}

const API_VERSION = env.API_VERSION;
const repoArchiveUrl = `https://github.com/Tinkoff/investAPI/archive/refs/tags/v${API_VERSION}.zip`;
const BASE_LIB_NAME = `investAPI-${API_VERSION}`;
const ARCHIVE_NAME = `${BASE_LIB_NAME}.zip`;
const ARCHIVE_CONTRACTS_DIR_PATH = getPath(`${BASE_LIB_NAME}/src/docs/contracts`);
const NEW_CONTRACTS_DIR_PATH = getPath('contracts');

const LOADED_ARCHIVE_PATH = await downloadRepoArchive(repoArchiveUrl, ARCHIVE_NAME);

try {
    await extract(LOADED_ARCHIVE_PATH, { dir: __dirname });

    /**
     * remove existing contracts directory and move contracts dir from archive to root dir
     */
    await fsExtra.remove(NEW_CONTRACTS_DIR_PATH);
    await fsExtra.move(ARCHIVE_CONTRACTS_DIR_PATH, NEW_CONTRACTS_DIR_PATH);

    /**
     * fix imports in proto files
     */
    let filesList = await fsExtra.readdir(NEW_CONTRACTS_DIR_PATH);
    filesList.forEach(fixImportsInProtoFiles);

    /**
     * run ts generation
     */
    await execa('npm', ['run', 'gen']);

    /**
     * remove proto files and fix exports in ts files
     */
    filesList = await fsExtra.readdir(NEW_CONTRACTS_DIR_PATH);
    filesList.forEach(removeProtoAndFixTs)

    //remove repo dir
    //remove archive
    //remove google
    fsExtra.remove(getPath(BASE_LIB_NAME));
    fsExtra.remove(getPath(ARCHIVE_NAME));
    fsExtra.remove(getPath('google'));
}
catch (e) {
    console.error(e);
}