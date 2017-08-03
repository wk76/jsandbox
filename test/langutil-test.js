#!/usr/bin/env node

let langUtil = require('../src/langutil');

let userArray = [
    { "name": "Willie", "surname": "Krause", "id": "1234" },
    { "name": "Andries", "surname": "Krause", "id": "4567" },
    { "name": "Wouter", "surname": "Couvaras", "id": "6789" }
];

/*
let qualificationsArray = [
    { "saqaId": "234534245", ....}
]

let userMap = {
    "1234": {
        "id": "1234",
        "name": "Willie",
        "surname": "Krause"
    },
    "4567": {
        "id": "4567",
        "name": "Andries",
        "surname": "Krause"
    },
    "6789": {
        "id": "6789",
        "name": "Wouter",
        "surname": "Couvaras"
    }
}
*/




let userMap = langUtil.convertToMap(userArray, 'id');

console.log(userMap);


