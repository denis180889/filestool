const fs = require('fs');

exports.showVisibleFilesWithoutDetailsInFolder = function (folder) {
    const dir = folder ? folder : "./";
    fs.readdir(dir, (err, files) => {
        if (err) console.log(err.message)

        const visibleFiles = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
        visibleFiles.forEach(file => console.log(file));
    })
}

exports.showAllFilesWithoutDetailsInFolder = function (folder) {
    const dir = folder ? folder : "./";
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.log(err.message)
            process.exit();
        }
        files.forEach(file => console.log(file));
    })
}

exports.showVisibleFilesWithDetailsInFolder = function (folder) {
    const dir = folder ? folder : "./";
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.log(err.message)
            process.exit();
        }
        const visibleFiles = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
        showStatsForFiles(visibleFiles);
    })
}

const showStatsForFiles = function (files) {
    files.forEach(function (file) {

        fs.stat(file, function (err, stats) {
            if (err) {
                console.log(err.message)
                process.exit();
            }
            console.log(`Details for: ${file}`);
            console.log(`Create date: ${stats.atime}`);
            console.log(`It is: ${checkFileOrDirectory(stats)}`);
            console.log(`\n`);
        });

    })
}

const checkFileOrDirectory = function (stats) {
    if (stats.isFile()) return `File`;
    if (stats.isDirectory()) return `Directory`;
} 