const fs = require('fs').promises;

exports.showVisibleFilesWithoutDetailsInFolder = async function (folder) {
    const dir = folder ? folder : "./";

    const files = await fs.readdir(dir);
    const visibleFiles = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    visibleFiles.forEach(file => console.log(file));
}

exports.showAllFilesWithoutDetailsInFolder = async function (folder) {
    const dir = folder ? folder : "./";

    const files = await fs.readdir(dir);
    files.forEach(file => console.log(file));
}

exports.showVisibleFilesWithDetailsInFolder = async function (folder) {
    const dir = folder ? folder : "./";

    const files = await fs.readdir(dir);
    const visibleFiles = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    await showStatsForFiles(visibleFiles);
}

exports.showAllFilesWithDetailsInFolder = async function (folder) {
    const dir = folder ? folder : "./";

    const files = await fs.readdir(dir);
    await showStatsForFiles(files);
}

const showStatsForFiles = async function (files) {
    for (const file of files) {
        const stats = await fs.stat(file);
        console.log(`Details for: ${file}`);
        console.log(`Create date: ${stats.atime}`);
        console.log(`It is: ${checkFileOrDirectory(stats)}`);
        console.log(`\n`);
    }
}

const checkFileOrDirectory = function (stats) {
    if (stats.isFile()) return `File`;
    if (stats.isDirectory()) return `Directory`;
} 