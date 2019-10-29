const fs = require('fs');
var XLSX = require('xlsx')
var workbook = XLSX.readFile('ARTI_M.xls');
const parseString = require('xml2js').Parser;
const xlsx = require("xlsx")
const parser = new parseString();

let parse = fs.readFileSync('msk.xml', 'utf-8');

let arrayKey = [];
let arrayVal = [];

parser.parseString(parse, (err, result)=>{
    console.log(result['Товар']['Номенклатура'].length);
    let filterArray = result['Товар']['Номенклатура'].filter(val => +val['СвободныйОстаток'][0])
    let endArray = filterArray.map(val => {
        arrayVal.push(+val["СвободныйОстаток"][0]);
        arrayKey.push(val["Код"][0])
        }
    );
})
var sheet_name_list = workbook.SheetNames;
var xlData = ss_ = workbook.Sheets[sheet_name_list[0]];
var ss_ = {};
ss = 0;
let bufferStock = 0;
let newxlData = {};
for (let key of Object.keys(xlData)) {
    
    newxlData[key] = xlData[key];
    if (key.replace(/[0-9]/gim, '') === 'B'){
        const value = arrayKey.indexOf(xlData[key].v);
        if ((value + 1)) {
            newxlData[`D${key.replace(/[A-Z]/gim, '')}`] = {
                v: +arrayVal[value], t:'n', w: ''+arrayVal[value]
            };
            console.log(key);
        }
    }
}
workbook.Sheets[sheet_name_list[0]] = newxlData;

XLSX.writeFile(workbook, 'outFinish.xls');