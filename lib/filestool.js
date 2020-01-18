const path = require('path');
const dir = require('./dir');
const process = require('process');

const args = process.argv.splice(2);

let pathParam;
let aFlagExits = false;
let sFlagExits = false;

exports.main = async () => {
    try {
        await run();
    }
    catch (err) {
        console.log(err.message);
        process.exit();
    }
}

const run = async function () {
    parseAllArgs(args);

    if (!pathParam && !aFlagExits && !sFlagExits) {
        await dir.showVisibleFilesWithoutDetailsInFolder();
        return;
    }
    if (!pathParam && aFlagExits && !sFlagExits) {
        await dir.showAllFilesWithoutDetailsInFolder();
        return;
    }
    if (!pathParam && !aFlagExits && sFlagExits) {
        await dir.showVisibleFilesWithDetailsInFolder();
        return;
    }
    if (!pathParam && aFlagExits && sFlagExits) {
        await dir.showAllFilesWithDetailsInFolder();
        return;
    }
    if (pathParam && !aFlagExits && !sFlagExits) {
        await dir.showVisibleFilesWithoutDetailsInFolder(pathParam);
        return;
    }
    if (pathParam && aFlagExits && !sFlagExits) {
        await dir.showAllFilesWithoutDetailsInFolder(pathParam);
        return;
    }
    if (pathParam && !aFlagExits && sFlagExits) {
        await dir.showVisibleFilesWithDetailsInFolder(pathParam);
        return;
    }
    if (pathParam && aFlagExits && sFlagExits) {
        await dir.showAllFilesWithDetailsInFolder(pathParam);
        return;
    }
}

const parseAllArgs = function (args) {
    if (args.length > 3) {
        console.log("Params count can't be more than 3");
        process.exit();
    }

    checkIfParamsContainPath(args);
    checkIfParamsContainAorSFlag(args);
}

const checkIfParamsContainPath = function (args) {
    args.forEach(function (arg) {
        if (arg.includes(path.sep)) {
            pathParam = arg;
        }
    })
}

const checkIfParamsContainAorSFlag = function (args) {
    args.forEach(function (arg) {
        if (arg === "-a") {
            aFlagExits = true;
        }
        if (arg === "-s") {
            sFlagExits = true;
        }
    })
}