const fs = require(`fs`);
const XLSX = require(`xlsx`);
const csv = require('csv-parser');




// const workbook = XLSX.readFile(`ARTI_M.xls`);
// const parseString = require(`xml2js`).Parser;

// function xmlParse() {
//     const parser = new parseString();
//     let parse = fs.readFileSync(`msk.xml`, `utf-8`); // reafing file
//     let arrayKey = [];
//     let arrayVal = [];
//     й
//     parser.parseString(parse, (err, result) => {
//         console.log(result[`Товар`][`Номенклатура`].length);
//         let filterArray = result[`Товар`][`Номенклатура`].filter(val => +val[`СвободныйОстаток`][0]) // search necessary column
//         filterArray.map(val => {                                                                     // writer array key/val
//             arrayVal.push(+val["СвободныйОстаток"][0]);
//             arrayKey.push(val["Код"][0])
//         });
//     })
//     let sheet_name_list = workbook.SheetNames;
//     let xlData = workbook.Sheets[sheet_name_list[0]];                                                // read first sheet
//     let newxlData = {};
//     for (let key of Object.keys(xlData)) {
//         newxlData[key] = xlData[key];
//         if (key.replace(/[0-9]/gim, ``) === `B`) {                                                   // hardkod column B!
//             const value = arrayKey.indexOf(xlData[key].v);                                           // add for array key 
//             if ((value + 1)) {
//                 newxlData[`D${key.replace(/[A-Z]/gim, ``)}`] = {                                     // add in newData new row column D 
//                     v: +arrayVal[value],
//                     t: `n`,
//                     w: `` + arrayVal[value]
//                 };
//                 console.log(key);
//             }
//         }
//     }
//     workbook.Sheets[sheet_name_list[0]] = newxlData;                                                  // add in sheet newDAta
//     XLSX.writeFile(workbook, `outFinish.xls`);                                                        //../outFinish.xls
// }

async function prom(name) {
    return new Promise(res => {
        fs.createReadStream(filePathName)
            .pipe(csv())
            .on('data', (data) => {
                a = JSON.stringify(data);
                res(data);
            })
    })
}

class ParcerXLS {
    constructor(filePathName, encoding) {
        this.fileBook = fs.readFileSync(filePathName, encoding);
        let arrayName = filePathName.split(`\/`);
        this.name = arrayName[arrayName.length - 1]
    }
}

class ParcerCSV {
    constructor(filePathName, encoding) {
        this.surname = encoding;
        this.name = fs.readFileSync(filePathName, encoding).split('\n').map(val=>val.split('\;'));
    };
}
class Factory { // Class xls psevdo factories
    constructor(filePathName, encoding) {
        this.filePathName = filePathName;
        this.encoding = encoding;
    }
    getFactory() {
        if ((this.filePathName.indexOf(`xls`) + 1)) {
            return new ParcerXLS(this.filePathName, this.encoding);
        }
        if ((this.filePathName.indexOf(`csv`) + 1)) {
            return new ParcerCSV(this.filePathName, this.encoding)
        }
        throw new Error('EXCEPT! undefined type')
    }
}

let newFiles1 = new Factory(`parse/csv/fullprice.csv`, `utf-8`);
let ales = newFiles1.getFactory()
console.log(ales.name[0])
// console.log(newFiles1.constructor.name);
// console.log(newFiles1.name);