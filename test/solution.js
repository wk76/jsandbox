#!/usr/bin/env node


let userArray = [
    { "name": "Willie", "surname": "Krause", "id": "1234" },
    { "name": "Andries", "surname": "Krause", "id": "4567" },
    { "name": "Wouter", "surname": "Couvaras", "id": "6789" },
    { "name": "Piet", "surname": "Pompies" }
];


function convertToMap(arrayData, uniqueIdField, errorHandlingType) {
    let userMap = {};
    let errors = [];
    let reply = {};

    for (let obj of arrayData)
        // VALID KEY FIELD EXISTS
        if (obj[uniqueIdField] && obj[uniqueIdField] != " ") {
            userMap[obj[uniqueIdField]] = obj;
            reply = userMap;
        }
        // "report_reply" PARAMETER FOR ERROR HANDLING TYPE
        else if (errorHandlingType == "report_reply") {
            let error = { message: "An object without a unique ID field was encountered, and ignored", obj: obj };
            errors.push(error);
            reply = { map: userMap, errors: errors };
        }
        // "fatal_exit" PARAMETER FOR ERROR HANDLING TYPE
        else if (errorHandlingType == "fatal_exit") {
            throw new Error("An object without a unique ID field was encountered, and ignored");
        }
        // "report_log" PARAMETER AND DEFAULT/NOT-SPECIFIED FOR ERROR HANDLING TYPE
        else {
            console.log("An object without a unique ID field was encountered, and ignored");
            console.log(obj);
        }
    return reply;
}

let results = convertToMap(userArray, "id", "report_log")
console.log(results);



