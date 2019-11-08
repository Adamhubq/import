const fs = require(`fs`);
const XLSX = require(`xlsx`);
const csv = require('csv-parser');






function xmlParse() {
    const parser = new parseString();
    let parse = fs.readFileSync(`msk.xml`, `utf-8`); // reafing file
    let arrayKey = [];
    let arrayVal = [];
    parser.parseString(parse, (err, result) => {
        console.log(result[`Товар`][`Номенклатура`].length);
        let filterArray = result[`Товар`][`Номенклатура`].filter(val => +val[`СвободныйОстаток`][0]) // search necessary column
        filterArray.map(val => { // writer array key/val
            arrayVal.push(+val["СвободныйОстаток"][0]);
            arrayKey.push(val["Код"][0])
        });
    })
    let sheet_name_list = workbook.SheetNames;
    let xlData = workbook.Sheets[sheet_name_list[0]]; // read first sheet
    let newxlData = {};
    for (let key of Object.keys(xlData)) {
        newxlData[key] = xlData[key];
        if (key.replace(/[0-9]/gim, ``) === `B`) { // hardkod column B!
            const value = arrayKey.indexOf(xlData[key].v); // add for array key 
            if ((value + 1)) {
                newxlData[`D${key.replace(/[A-Z]/gim, ``)}`] = { // add in newData new row column D 
                    v: +arrayVal[value],
                    t: `n`,
                    w: `` + arrayVal[value]
                };
                console.log(key);
            }
        }
    }
    workbook.Sheets[sheet_name_list[0]] = newxlData; // add in sheet newDAta
    XLSX.writeFile(workbook, `outFinish.xls`); //../outFinish.xls
}
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
class ARTIM {
    constructor(array, xlsFile) {
        // const workbook = XLSX.readFile(`parse/templateParse/ARTI_M.xls`);
        console.log('ARTIM');
        let fileTemplate = XLSX.readFile(xlsFile);
        let sheet_name_list = fileTemplate.SheetNames;
        let xlData = fileTemplate.Sheets[sheet_name_list[0]]; // read first sheet
        let arrayKey = array.map(val => val[0]);
        let arrayVal = array.map(val => val[8]);
        let json = XLSX.utils.sheet_to_json(xlData);
        this.newxlData = [];
        for (let value of json) {
            let index = arrayKey.indexOf(value['Артикул']) + 1;
            if (index) {
                this.newxlData.push({
                    'Название товара': value['Название товара'],
                    "Артикул": value['Артикул'],
                    "Идентификатор товара в магазине": value['Идентификатор товара в магазине'],
                    "Остаток": arrayVal[index],
                    "Цена продажи": value['Цена продажи'],
                    "Старая цена": value['Цена продажи'],
                    "Закупочная цена": value['Закупочная цена']
                })
                break;
            }
        }
    }
}

class ParcerXLS {
    constructor(filePathName, encoding) {
        this.fileBook = fs.readFileSync(filePathName, encoding);
        let arrayName = filePathName.split(`\/`);
        this.name = arrayName[arrayName.length - 1]
    }
}

class ParcerCSV {
    constructor(filePathNameCsv, filePathNameXls) {
        this.array = fs.readFileSync(filePathNameCsv, 'utf-8').split('\n').map(val => val.split('\;'));
        this.filePathNameXls = `parse/xls/${filePathNameXls}`;
    };
    generateFiel() {
        
        if ((this.filePathNameXls.indexOf('ARTI_M.xls') + 1)) {
            return new ARTIM(this.array, this.filePathNameXls); 
        }
        console.log(this.filePathNameXls);
        return null;
        
    }
    showFilesARTIM() {
        return new ARTIM(this.array);
    }
}
class Factory { // Class xls psevdo factories
    constructor(filePathName, filePathNameXls) {
        this.filePathName = filePathName;
        this.filePathNameXls = filePathNameXls;
        this.encoding = 'utf-8';
        console.log('Factory');
    }
    getFactory() {
        if ((this.filePathName.indexOf(`xls`) + 1)) {
            return new ParcerXLS(this.filePathName, this.filePathNameXls);
        }
        if ((this.filePathName.indexOf(`csv`) + 1)) {
            return new ParcerCSV(this.filePathName, this.filePathNameXls)
        }
        throw new Error('EXCEPT! undefined type')
    }

}

let arrayFileName = fs.readFileSync(`parse/csv/nameCsv.json`, `utf-8`);

let arrayGreat = [];

JSON.parse(arrayFileName).map(val => {
    let newFiles1 = new Factory(`parse/csv/${Object.keys(val)[0]}`, Object.values(val)[0]);
    newFiles1.getFactory().generateFiel().newxlData
        .map(value => arrayGreat.push(value));
})

console.log(arrayGreat);



// console.log(objParseFile.newxlData)




