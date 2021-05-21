#!/usr/bin/env node

let shell = require("shelljs");
let colors = require("colors");

let appName = process.argv[2] || ".";

const run = async () => {
    console.log("Creating danidre's ejs mvc boilerplate".yellow);
    await cloneDanidresEjsMvcAppBoilerplate();
    await changeDirectory();
    await installDependencies();
    console.log("Pruning external dependencies.".yellow);
    await disconnectFromRemoteBranch();
    await deleteLocalBranch();
    console.log("Created danidre's ejs mvc boilerplate".green);
};

const cloneDanidresEjsMvcAppBoilerplate = () => {
    return new Promise(resolve => {
        shell.exec(
            `git clone https://github.com/danidre14/express_ejs-mongoose_template ${appName}`,
            () => {
                resolve();
            }
        );
    });
};

const changeDirectory = () => {
    return new Promise(resolve => {
        if (appName !== ".")
            shell.cd(appName)
        resolve();
    })
}

const installDependencies = () => {
    return new Promise(resolve => {
        console.log("\nInstalling boilerplate templates\n".cyan)
        shell.exec(`npm install`, () => {
            console.log("\nFinished installing templates\n".green)
            resolve();
        })
    })
}

const disconnectFromRemoteBranch = () => {
    return new Promise(resolve => {
        shell.exec(`git remote rm origin`, () => {
            resolve();
        });
    });
};

const deleteLocalBranch = () => {
    return new Promise(resolve => {
        shell.exec(`rm -rf .git`, () => {
            resolve();
        });
    });
};

run();
