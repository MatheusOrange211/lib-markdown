#!/usr/bin/env node

// cli - command line interface - here we will be show the commands by terminal instead index.js   
const chalk = require('chalk');
const getFile = require('./index.js');
const validUrls = require('./http_validation');
const way = process.argv;

async function processText(filepath) {
    const result = await getFile(filepath[2]);
    if (filepath[3] === 'validate') {
        console.log(chalk.yellow('Validate of links below :\n'), await validUrls(result));
    } else {
        console.log(chalk.yellow('lista de links\n'),result);
       
    }
}
// console.log(getFile(way[2]));
processText(way);