
const path = require('path');
const dir = require('./dir');

const args = process.argv.splice(2);

let pathParam;
let aFlagExits = false;
let sFlagExits = false;

exports.process = function () {
    parseAllArgs(args);

    if (!pathParam && !aFlagExits && !sFlagExits) {
        dir.showVisibleFilesWithoutDetailsInFolder();
        return;
    }

    if (!pathParam && aFlagExits && !sFlagExits) {
        dir.showAllFilesWithoutDetailsInFolder();
        return;
    }

    if (!pathParam && !aFlagExits && sFlagExits) {
        dir.showVisibleFilesWithDetailsInFolder();
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
    }
    )
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