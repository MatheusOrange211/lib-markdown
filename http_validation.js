const chalk = require('chalk');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
chalk

function errorConsole(err) {
    throw new Error(err.message);
}

async function checkStatus(arrayURLs) {
    try {
        const arraystatus = await Promise
            .all(arrayURLs
                .map(arrayURL => Promise
                    .all(arrayURL
                        .map(async url => {
                            const res = await fetch(url);
                            return `${res.status} - ${res.statusText}`;
                        }))))
        return arraystatus;
    }catch(err){
        errorConsole(err);
    }finally{
        console.log(chalk.yellow("finished operation\n"))
    };
}

// return only the values of the objects passed  We are get the links by paths, so is necessary create a list  of first array and get the content inside objects and repeat for the second or third array
function getArraysUrls(arrayLinks) {
    let curr = 0;
    let arrayresult = [];
    while (curr < arrayLinks.length) {
        let arraycurrent = arrayLinks[curr];
        arrayresult.push(arraycurrent.map(objectLink => Object
            .values(objectLink).join()));
        curr++;
    }
    return arrayresult;
}

function combineStatusLink(links, status) {
    const l = links;
    const s = status;
    const linksperfile = [];
    for (let i = 0; i < links.length; i++) {
        for (let j = 0; j < links[i].length; j++) {
            linksperfile.push({ link: l[i][j], status: s[i][j] });
        }
    }
    return linksperfile;
}

async function validUrls(arrayLinks) {
    const links = await getArraysUrls(arrayLinks);
    const statusLinks = await checkStatus(links);
    return combineStatusLink(links, statusLinks);
}

module.exports = validUrls;





// async function checkStatus(arrayURLs) {
//     const arraystatus = await Promise.all(arrayURLs.map(async url => {
//         const res = await fetch(url);
//         return res.status;
//     }))
//     return arraystatus;
// }