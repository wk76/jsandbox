#!/usr/bin/env node


let userArray = [
    { "name": "Willie", "surname": "Krause", "id": "1234" },
    { "name": "Andries", "surname": "Krause", "id": "4567" },
    { "name": "Wouter", "surname": "Couvaras", "id": "6789" }
];

/*
let userMap = {};
for (let user of userArray) {
    userMap[user.id] = user;
}
console.log(userMap);
*/


function convertToMap(arrayData, uniqueIdField) {
    let userMap = {};
    for (let obj of arrayData) {
        userMap[obj.uniqueIdField] = obj;
    }
    return userMap;
}

let results = convertToMap(userArray, "id")
console.log(results);