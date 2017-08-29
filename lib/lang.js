
const csvtojson = require('csvtojson');

function convertToMap(arrayData, uniqueIdField, errorHandlingType) {

    let userMap = {};
    let errors = [];

    for (let obj of arrayData) {

        if (obj[uniqueIdField]) {

            // uniqueIdField is a valid value

            if (!userMap.hasOwnProperty(obj[uniqueIdField])) {

                // all good
                userMap[obj[uniqueIdField]] = obj;

            } else {

                // the value of uniqueIdField already exists in the map, so this is a duplicate
                if (errorHandlingType == "fatal_exit") {
                    throw new Error("Objects with duplicate IDs were encountered and ignored");
                } else if (errorHandlingType == "report_reply") {
                    errors.push({ message: "Objects with duplicate IDs were encountered and ignored", obj: obj });
                } else {
                    console.log("Objects with duplicate IDs were encountered and ignored. Duplicate ID: " + obj[uniqueIdField]);
                }

            }

        } else {

            // uniqueIdField is NOT a valid value 
            if (errorHandlingType == "fatal_exit") {
                throw new Error("An object without a unique ID field was encountered and ignored");
            } else if (errorHandlingType == "report_reply") {
                errors.push({ message: "An object without a unique ID field was encountered and ignored", obj: obj });
            } else {
                console.log("An object without a unique ID field was encountered and ignored");
                console.log(obj);
            }

        }

    }

    if (errorHandlingType == "report_reply") {
        return { map: userMap, errors: errors }
    } else {
        return userMap;
    }

}

function getRandomIntSync(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let int = Math.floor(Math.random() * (max - min)) + min;
    console.log('RANDOM INT GENERATED: ' + int);
    return int;
}

function getRandomIntAsync(min, max) {
    return new Promise((resolve, reject) => { 
        setTimeout(function (){
            min = Math.ceil(min);
            max = Math.floor(max);
            let int = Math.floor(Math.random() * (max - min)) + min;
            console.log('RANDOM INT GENERATED (ASYNC): ' + int);
            resolve(Math.floor(int));
        }, 3000);
    });
}

function getCharAfterRandomTimeDelay(char) {
    return new Promise((resolve, reject) => { 
        setTimeout(function (){
            resolve(char);
        }, getRandomIntSync(1, 12)+000);
    });
}

function csvToJson(csvFilePath, headers) {

    let options = {
        toArrayString: true,
        checkType: false,
        trim: true
    }

    if ((headers) && (headers instanceof Array)) {
        options.headers = headers;
    } else if (headers === false) {
        options.noheader = true;
    }

    let jsonObjects = [];

    return new Promise((resolve, reject) => {

        csvtojson(options)
            .fromFile(csvFilePath)
            .on('json', (jsonObj) => {

                jsonObjects.push(jsonObj);

            })
            .on('done', (error) => {

                if (error) {
                    reject(error);
                } else {
                    resolve(jsonObjects);
                }

            });

    });

};


exports.convertToMap = convertToMap;
exports.getRandomIntSync = getRandomIntSync;
exports.getRandomIntAsync = getRandomIntAsync;
exports.getCharAfterRandomTimeDelay = getCharAfterRandomTimeDelay;
exports.csvToJson = csvToJson;


