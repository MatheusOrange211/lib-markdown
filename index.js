const chalk = require('chalk');
const fs = require('fs');
const path = require('path');


const regexWord = /\[([^\]]*)]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;



// /https?:\/\/[^s$.?#].[^\/\s]*\//gm -> catch until first /

// function applying regex terms
function extractedLinks(text){
    const arrayLinks = [];
    let temp;
    while((temp = regexWord.exec(text)) !== null){
        arrayLinks.push({[temp[1]]:temp[2]})
    }
    return arrayLinks.length === 0? 'There not links here!': arrayLinks;
}

function showError(e) {
    throw new Error(chalk.red(e.code, 'You should pass a filepath valid!'));
}

//a refactorion for the original code. Here, now, we get the links for paths not file
async function getFile(filepath){
    const filePathAbsolute = path.join("__dirname","..", filepath);
    try{
        const files = await fs.promises.readdir(filePathAbsolute, enconding = 'utf-8');
        const result = await Promise.all(files.map(async(file)=>{
            const localFile = `${filePathAbsolute}/${file}`;
            const text = await fs.promises.readFile(localFile, enconding='utf-8');
            return extractedLinks(text);
        }));
        return result;
    }catch(err){
        return showError(err);
    }
}


module.exports =  getFile;


// using promises, then and catch in same getFile function
// function getFile(filepath){
//     fs.promises.readFile(filepath, enconding='utf-8')
//     .then((text)=>(console.log(chalk.green("Verification Completed !\n")), 
//     console.log(extractedLinks(text))))
//     .catch(e => showError(e));
// }


// // // using async/await mode
// async function getFile(filepath) {
//         const text = await fs.promises.readFile(filepath, encoding = "utf-8");
//         try {
//                 console.log(chalk.green("Verification Completed !\n"));
//                 console.log(extractedLinks(text));
//             } catch (error) {
//                     showError(error);
//                 }finally{
//                         console.log(chalk.red("Exit . . . "))
//                     }
//                 }
// // get the filepath and show it in terminal
// function getFile(filepath){
//     fs.readFile(filepath,encondig = "utf-8",(e,data)=>{
//         if(!e){
//             console.log(chalk.green("Verification Completed !\n"));
//             console.log(data);
//         }else{
//             showError(e);
//         }
//     })
// }