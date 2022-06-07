import { execa } from 'execa';
import { https } from "follow-redirects";
import extract from "extract-zip";
import path from "path";
import fsExtra from "fs-extra";



function download(url, dest, cb) {
    const file = fsExtra.createWriteStream(dest);

    https.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(cb);  // close() is async, call cb after close completes.
        });
    }).on('error', function (err) { // Handle errors
        fsExtra.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
};

download("https://github.com/Tinkoff/investAPI/archive/refs/heads/release/1.0.8.zip", "./investAPI-release-1.0.8.zip", async () => {

    const githubZipPath = path.join(__dirname, 'investAPI-release-1.0.8.zip')
    const dir = path.join(__dirname, './')
    const contracts = path.join(__dirname, './contracts');

    try {
        await extract(githubZipPath, { dir: dir });

        await fsExtra.remove(path.join(__dirname, './contracts'))
        await fsExtra.move(path.join(__dirname, './investAPI-release-1.0.8/src/docs/contracts'), contracts);

        let filesList = await fsExtra.readdir(contracts)

        filesList.forEach(file => {
            const filePath = path.join(__dirname, './contracts/' + file);
            const fileContent = fsExtra.readFileSync(filePath).toString();

            let newContent = ""

            if (file === "sandbox.proto") {
                const searchRegExp = /import \"/gm;

                newContent = fileContent.replace(searchRegExp, "import \"contracts/")
            }
            else {
                // @ts-ignore
                newContent = fileContent.replace("common.proto", "contracts/common.proto")
            }


            fsExtra.writeFileSync(filePath, newContent);


        })

        await execa('npm', ['run', 'gen']);

        //remove proto files and google dir

        filesList = await fsExtra.readdir(contracts);
        filesList.forEach(file => {
            const filePath = path.join(__dirname, './contracts/' + file);
            if (file.endsWith(".proto")) {
                fsExtra.remove(filePath);
            }
            else if(file.endsWith(".ts")) {
                const fileContent = fsExtra.readFileSync(filePath).toString();

                //cleaning ts files
                let newContent = "";
                newContent = fileContent.replace('export const protobufPackage = "tinkoff.public.invest.api.contract.v1";', "");
                newContent = newContent.replace('/* eslint-disable */\n', "");
                newContent = newContent.replace('\n\n', '')
                fsExtra.writeFile(filePath, newContent);
            }
        })

        //remove repo dir
        fsExtra.remove(path.join(__dirname, './investAPI-release-1.0.8'))

        //remove archive
        fsExtra.remove(path.join(__dirname, './investAPI-release-1.0.8.zip'))

        //remove google
        fsExtra.remove(path.join(__dirname, './google'))

        //add clean logic
            //remove google
            //remove investAPI-release-1.0.8
            //investAPI-release-1.0.8.zip
    }
    catch(e) {
        console.error(e);
    }
})

const styles = {

}


const statusParams: StatusParams = {
    completed: {
        className: styles["green"],
        description: "Завершена",
    },
    cancelled_by_patient: {
        className: styles["red"],
        description: "Отменена клиентом",
    },
    cancelled_by_therapist: {
        className: styles["red"],
        description: "Отменена вами",
    },
    patient_not_came: {
        className: styles["grey"],
        description: "Клиент не вошёл",
    },
    therapist_not_came: {
        className: styles["grey"],
        description: "Вы не вошли",
    },
};

interface Status {
    className: string;
    description: string;
}

type StatusParams = Record<string, Status>