const fs = require('fs').promises;
const path = require('path');

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
    const files = await fs.readdir(getPathFromParam(folder));
    const visibleFiles = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    await showStatsForFiles(visibleFiles);
}

exports.showAllFilesWithDetailsInFolder = async function (folder) {
    const files = await fs.readdir(getPathFromParam(folder));
    await showStatsForFiles(files);
}

const getPathFromParam = function (folder) {
    return folder ? folder : "./";
}

const showStatsForFiles = async function (files) {
    for (const file of files) {
        const stats = await fs.stat(file);
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