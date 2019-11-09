const fs = require(`fs`);
const XLSX = require(`xlsx`);
// const csv = require('csv-parser');




const workbook = XLSX.readFile(`LAFARG.xls`);
const parseString = require(`xml2js`).Parser;

// function xmlParse() {
    const parser = new parseString();
    // let parse = fs.readFileSync(`msk.xml`, `utf-8`); // reafing file
    let arrayKey = [];
    let arrayVal = [];
    // parser.parseString(parse, (err, result) => {
    //     console.log(result[`Товар`][`Номенклатура`].length);
    //     let filterArray = result[`Товар`][`Номенклатура`].filter(val => +val[`СвободныйОстаток`][0]) // search necessary column
    //     filterArray.map(val => {                                                                     // writer array key/val
    //         arrayVal.push(+val["СвободныйОстаток"][0]);
    //         arrayKey.push(val["Код"][0])
    //     });
    // })
    let filePathName = fs.readFileSync('hack.csv', 'utf-8');
    arrayKey = filePathName
        	.split('\n').map(val=> val.split('\;')[0].replace(/_/gim, '\/'));
    arrayVal = filePathName
        	.split('\n').map(val=> {

        		if (((''+val.split('\;')[7]).indexOf('Ожидается') + 1)){
        			return 0;
        		}
        		if (((''+val.split('\;')[7]).indexOf('>') + 1)){
        			return 999;
        		}
        		if (((''+val.split('\;')[7]).indexOf('<') + 1)){
        			return 999;
        		}
        		return ''+val.split('\;')[7];
        	});

    // let newMapKey = filePathName
    //     	.split('\n').map(val=> val.split('\;')[]);


    fs.writeFileSync('ss.json', JSON.stringify(arrayVal));

    arrayKey.map((val, index) =>{
    	if (val == 'GA2207600AL') {
    		console.log(val);
    		console.log(arrayVal[index]);
    	}
    })

    let sheet_name_list = workbook.SheetNames;
    let xlData = workbook.Sheets[sheet_name_list[0]];                                                // read first sheet
    let newxlData = {};
    for (let key of Object.keys(xlData)) {
        newxlData[key] = xlData[key];
        if (key.replace(/[0-9]/gim, ``) === `B`) {                                                   // hardkod column B!
            const value = arrayKey.indexOf(xlData[key].v);                                           // add for array key 
            if(key === 'GA2207600AL') {
            	console.log(arrayVal[value])
            	console.log(typeof arrayVal[value])
            };
            if ((value + 1)) {
                newxlData[`D${key.replace(/[A-Z]/gim, ``)}`] = {                                     // add in newData new row column D 
                    v: +arrayVal[value],
                    t: `n`,
                    w: `` + arrayVal[value]
                };
                // console.log(key);
            }
        }
    }
    workbook.Sheets[sheet_name_list[0]] = newxlData;                                                  // add in sheet newDAta
    XLSX.writeFile(workbook, `outFinLafrag1.xls`);                                                        //../outFinish.xl

// async function prom(name) {
//     return new Promise(res => {
//         fs.createReadStream(filePathName)
//             .pipe(csv())
//             .on('data', (data) => {
//                 a = JSON.stringify(data);
//                 res(data);
//             })
//     })
// }

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
        this.name = fs.readFileSync(filePathName, encoding)
        	.split('\n').map(val=>val.split('\;'));
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

// let newFiles1 = new Factory(`parse/csv/fullprice.csv`, `utf-8`);
// let ales = newFiles1.getFactory()
// console.log(ales.name[0])
// console.log(newFiles1.constructor.name);
// console.log(newFiles1.name);