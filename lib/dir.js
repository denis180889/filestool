const fs = require('fs').promises;
const path = require('path');
const process = require('process');

exports.showVisibleFilesWithoutDetailsInFolder = async function (folder) {
    const files = await fs.readdir(getPathFromParam(folder));
    const visibleFiles = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    visibleFiles.forEach(file => console.log(file));
}

exports.showAllFilesWithoutDetailsInFolder = async function (folder) {
    const files = await fs.readdir(getPathFromParam(folder));
    files.forEach(file => console.log(file));
}

exports.showVisibleFilesWithDetailsInFolder = async function (folder) {
    const filePath = getPathFromParam(folder);
    const files = await fs.readdir(filePath);
    const visibleFiles = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    await showStatsForFiles(filePath, visibleFiles);
}

exports.showAllFilesWithDetailsInFolder = async function (folder) {
    const filePath = getPathFromParam(folder);
    const files = await fs.readdir(filePath);
    await showStatsForFiles(filePath, files);
}

const getPathFromParam = function (folder) {
    return folder ? folder : process.cwd();
}

const showStatsForFiles = async function (filePath, files) {
    for (const file of files) {
        const fullFileName = path.resolve(filePath, file);
        const stats = await fs.stat(fullFileName);
        console.log(`Details for: ${file}`);
        console.log(`Create date: ${stats.birthtime}`);
        console.log(`Update date: ${stats.mtime}`);
        console.log(`It is: ${checkFileOrDirectory(stats)}`);
        showSizeIfItIsFile(stats);
        console.log(`\n`);
    }
}

const checkFileOrDirectory = function (stats) {
    if (stats.isFile()) return `File`;
    if (stats.isDirectory()) return `Directory`;
}

const showSizeIfItIsFile = function (stats) {
    if (stats.isFile()) console.log(`Size: ${stats.size}`);
} 