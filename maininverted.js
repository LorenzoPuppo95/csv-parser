const fs = require("fs");

function readJsonFromFile(filePath) {
    try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.log(`Error reading file ${filePath}:`, error);
    }
}

function getKeysFromJsonArray(jsonArray) {
    return Object.keys(jsonArray[0]);
}

function getValuesFromJsonArray(jsonArray) {
    return jsonArray.map(entry => Object.values(entry));
}

function convertArrayToCsv(keys, values) {
    const csvRows = [];
    csvRows.push(keys.join(','));
    values.forEach(valueArray => {
        csvRows.push(valueArray.join(','));
    });
    return csvRows.join('\n');
}

function writeCsvToFile(filePath, csv) {
    try {
        fs.writeFileSync(filePath, csv, 'utf8');
        console.log(`Ho scritto il CSV in ${filePath}`);
    } catch (error) {
        console.log(`Errore nella scrittura del file ${filePath}:`, error);
    }
}

function fromJsonToCsv(jsonArray) {
    const keys = getKeysFromJsonArray(jsonArray);
    const values = getValuesFromJsonArray(jsonArray);
    const csv = convertArrayToCsv(keys, values);
    return csv;
}

function main(originPath, destinationPath) {
    const jsonArray = readJsonFromFile(originPath);
    const csv = fromJsonToCsv(jsonArray);
    writeCsvToFile(destinationPath, csv);
}

const [,, originPath, destinationPath] = process.argv;
if (originPath && destinationPath) {
    main(originPath, destinationPath);
} else {
    console.log("Usage: node json-to-csv.js <originPath> <destinationPath>");
}