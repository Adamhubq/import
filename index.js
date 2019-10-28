const fs = require('fs');
// const parseString = require('xml2js').Parser;
// const xlsx = require("xlsx")
// const parser = new parseString();

// let parse = fs.readFileSync('msk.xml', 'utf-8');

// parser.parseString(parse, (err, result)=>{
//     console.log(result['Товар']['Номенклатура'].length);
//     let filterArray = result['Товар']['Номенклатура'].filter(val => +val['СвободныйОстаток'][0])
//     let endArray = filterArray.map(val => {
//         const key = val["Код"][0];
//         const value = +val["СвободныйОстаток"][0];
//         return {key: value};
//         }
//     );
//     console.log(endArray);
// })

// let ss = xlsx.parse(xsl);


var XLSX = require('xlsx')
var workbook = XLSX.readFile('ARTI_M.xls');
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
console.log(xlData);