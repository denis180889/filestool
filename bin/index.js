#!/usr/bin/env node
const filestool = require('../lib/filestool');

(async () => {
    try {
        await filestool.process();
    }
    catch (err) {
        //console.log(err.message)
        throw err;
        process.exit();
    }
})()