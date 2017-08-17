#!/usr/bin/env node


let userArray = [
    { "name": "Willie", "surname": "Krause", "id": "1234" },
    { "name": "Andries", "surname": "Krause", "id": "4567" },
    { "name": "Colin", "surname": "Elliot", "id": "4567" },
    { "name": "Piet", "surname": "Pompies" },
    { "name": "Wouter", "surname": "Couvaras", "id": "6789" }
];


function convertToMap(arrayData, uniqueIdField, errorHandlingType) {

    let userMap = {};
    let errors = [];

    let reply = userMap;


    if (errorHandlingType == "report_reply") {
        reply = { map: userMap, errors: errors }
    }

    for (let obj of arrayData)
        if (obj[uniqueIdField] && obj[uniqueIdField] != " " && !(obj[uniqueIdField] in userMap)) {
            userMap[obj[uniqueIdField]] = obj;
        } else if (errorHandlingType == "report_reply") {
            if (obj[uniqueIdField] == undefined || obj[uniqueIdField] == " ") {
                let error = { message: "An object without a unique ID field was encountered and ignored", obj: obj };
                errors.push(error);
            } else if ((obj[uniqueIdField] in userMap)) {
                let error = { message: "Objects with duplicate IDs were encountered and ignored", obj: obj };
                errors.push(error);
                delete userMap[obj[uniqueIdField]];
            }
            reply = { map: userMap, errors: errors };
        }
        else if (errorHandlingType == "fatal_exit") {
            if (obj[uniqueIdField] == undefined || obj[uniqueIdField] == " ")
            { throw new Error("An object without a unique ID field was encountered and ignored"); }
            else if ((obj[uniqueIdField] in userMap))
            { throw new Error("Objects with duplicate IDs were encountered and ignored"); }
        }
        else {
            if (obj[uniqueIdField] == undefined || obj[uniqueIdField] == " ") {
                console.log("An object without a unique ID field was encountered and ignored:");
                console.log(obj);
            } else if ((obj[uniqueIdField] in userMap)) {
                console.log("Objects with duplicate IDs were encountered and ignored. Duplicate ID:");
                console.log(obj[uniqueIdField]);
                delete userMap[obj[uniqueIdField]];
            }
            reply = userMap;
        }
    return reply;

}

let results = convertToMap(userArray, "id", "report_log")
console.log(results);

