#!/usr/bin/env node


let userArray = [
    { "name": "Willie", "surname": "Krause", "id": "1234" },
    { "name": "Andries", "surname": "Krause", "id": "4567" },
    { "name": "Wouter", "surname": "Couvaras", "id": "6789" }
];

//console.log(userArray[0]["id"])

let userMap = [];
for (let user in userArray) {
    let key = userArray[user]["id"];
    let name = userArray[user]["name"];
    let surname = userArray[user]["surname"];
    let obj = {}

    obj[key] = { id: key, name: name, surname: surname };
    userMap.push(obj);

}
console.log(userMap);


/*
for (let i in userArray) {
let key = "\"" + userArray[i]["id"] + "\"";
let content = "\"id\": \"" + userArray[i]["id"] + "\", \"name\": \"" + userArray[i]["name"] + "\", \"surname\": \"" + userArray[i]["surname"] +"\"";
let obj = key + ": {" + content + "}";
console.log(obj);
}
*/

/*
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

//console.log(userMap);
*/