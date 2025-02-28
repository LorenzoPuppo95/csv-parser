const fs = require("fs");

function readCsvFromFile(filePath) {
    try {
        const csvData = fs.readFileSync(filePath, 'utf8');
        // console.log(csvData);
        return csvData;
    } catch (error) {
        console.log(`Error reading file ${filePath}:`)
    }
}

function splitCsvInRows(csvData) {
    const splittedCsv = csvData.split(/\r?\n/);
    return splittedCsv;
}

function splitRows(arrayOfString) {
    const newArray = [];
    for (let i = 0; i < arrayOfString.length; i++) {
        newArray.push(arrayOfString[i].split(','));
    }
    // console.log(newArray);
    return newArray;
}

function getKeysFromFirstLine(arrayOfArray) {
    const keys= arrayOfArray[0];
    console.log(keys);
    return keys;
}

function getValues(arrayOfArray) {
    const values=arrayOfArray.slice(1);
    console.log(values);
    return values;
}

function createEntry(keys, valuesRow) {
    let entry = {};
    for (let j = 0; j < keys.length; j++) {
        entry[keys[j]] = valuesRow[j];
    }
    return entry;
}

// function createArrayOfCsvEntries(keys, values) {
//     const arrayOfEntries = [];
//     for (let i = 0; i < values.length; i++) {
//         let entry = {};
//         for (let j = 0; j < keys.length; j++) {
//             entry[keys[j]] = values[i][j];
//         }
//         arrayOfEntries.push(entry);
//     }
//     return arrayOfEntries;
// }

function createArrayOfCsvEntries(keys, values) {
    const arrayOfEntries = [];
    for (let i = 0; i < values.length; i++) {
        const valueArray = values[i];
        const entry = createEntry(keys, valueArray);
        arrayOfEntries.push(entry);
    }
    return arrayOfEntries;
}

function convertArrayToJson(array) {
    return JSON.stringify(array);
}

function writeJsonToFile(filePath, json) {
    try {
        fs.writeFileSync(filePath, json, 'utf8');
        console.log(`Ho scritto il JSON in ${filePath}`);
    } catch (error) {
        console.log(`Errore nella scrittura del file ${filePath}:`, error);
    }
}

function fromCsvToJson(csv) {
    const arrayOfStringRows = splitCsvInRows(csv);
    const arrayOfSplittedRows = splitRows(arrayOfStringRows);
    const keys = getKeysFromFirstLine(arrayOfSplittedRows);
    const values = getValues(arrayOfSplittedRows);
    const arrayFromEntries = createArrayOfCsvEntries(keys, values);
    console.log(arrayFromEntries);
    const json = convertArrayToJson(arrayFromEntries);
    return json;
}

function getOriginPath(){
    return process.argv[2];
}

function getDestinationPath(){
    return process.argv[3];
}

function main() {
    const originPath = getOriginPath();
    const csvData = readCsvFromFile(originPath);
    // const csvData = readCsvFromFile('./data/test1.csv');
    const json = fromCsvToJson(csvData);
    const destinationPath = getDestinationPath()
    writeJsonToFile(destinationPath, json);
    // writeJsonToFile('./output/test1.json', json);
}

// const [,, originPath, destinationPath] = process.argv;
// if (originPath && destinationPath) {
//     main(originPath, destinationPath);
// } else {
//     console.log("Usage: node main.js <originPath> <destinationPath>");
// }

main();