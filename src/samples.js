#!/usr/bin/env node

let user = {
    name: 'Willie',
    surname: 'Krause',
    birthdate: '760607',
    fullName: function() {
        return this.name + ' ' + this.surname
    }
}

let user2 = {
    name: 'Andries',
    surname: 'Krause',
    birthdate: '790710',
    fullName: function() {
        return this.name + ' ' + this.surname
    }
}


function printUserProperty(user, property) {
    console.log(user[property]);
}

console.log('--------------- ARRAY ITERATION ( using "for of" ) -----------------');

//
// the "for of" iterator will iterate over the contents of an ARRAY
//

let ingredients = [ 'Meat', 'Potatoes' ];   // array of strings
let numbers = [ 1, 4, 20.3 ];               // array of numbers
let users = [ user, user2 ];                // array of objects

console.log('Iterating array of strings (ingredients):');
for (let ingredient of ingredients) {
    console.log(ingredient);
}

console.log(' ');

console.log('Iterating array of numbers:');
for (let number of numbers) {
    console.log(number);
}

console.log(' ')

console.log('Iterating array of objects (users):');
let counter = 0;
for (let user of users) {
    counter++;
    user.id = counter;
    //user['id'] = counter;
    console.log(counter + ': ' + user.name);
    //console.log(user['name']);
    //printUserProperty(user, 'name');
    //printUserProperty(user, 'surname');

    delete user.birthdate;
}

console.log(' ')

console.log('--------------- OBJECT PROPERTY ITERATION ( using "for in" ) -----------------');

//
// the "for in" iterator will iterate over the contents of an OBJECT/MAP
//

for (let property in user) {
    console.log('Property: ' + property);
}

let listOfProperties = Object.keys(user);

console.log('listOfProperties: ' + listOfProperties);

console.log(' ')

console.log('--------------- OBJECT PROPERTY VALIDATION ( obj.hasOwnProperty() vs ob[prop] ) -----------------');

let qualification1 = {
    name: 'Bsc Computer Science',
    institution: "UNISA",
    yearObtained: "2001",
    isDegree: true,
    subjects: [ 'Java', 'Javascript', 'Information Systems', 'SQL Databases']
}

let qualification2 = {
    name: 'Matric',
    yearObtained: "1988",
    isDegree: false,
    subjects: []
}

//
// 1.) Check for existence of property, with ... obj.hasOwnProperty("propertyName")
// 2.) Check if property has a truthy value, with  ... obj[propertyName]
//

let objPropertyName1 = "isDegree";

if (qualification1[objPropertyName1]) {
    console.log('Qualification 1 "' + objPropertyName1 + '" has a truthy value');    
} else {
    console.log('Qualification 1 "' + objPropertyName1 + '" has a falsy value');
}

if (qualification2[objPropertyName1]) {
    console.log('Qualification 2 "' + objPropertyName1 + '" has a truthy value');    
} else {
    console.log('Qualification 2 "' + objPropertyName1 + '" has a falsy value');
}

let objPropertyName2 = "institution";

if (qualification1.hasOwnProperty(objPropertyName2)) {
    console.log('Qualification 1 has a property named "' + objPropertyName2 + '"');    
} else {
    console.log('Qualification 1 does NOT have a property named "' + objPropertyName2 + '"');
}

if (qualification2.hasOwnProperty(objPropertyName2)) {
    console.log('Qualification 2 has a property named "' + objPropertyName2 + '"');      
} else {
    console.log('Qualification 2 does NOT have a property named "' + objPropertyName2 + '"');
}

console.log(' ')


console.log('--------------- MUTABILITY -----------------');

let name1 = "Willie";
let name2 = name1;      // string is immutable, so name2 is actually a COPY of the value of name1, but IS NOT EQUAL to name1
let name3 = name2;

console.log("Name1: " + name1);
console.log("Name2: " + name2);
console.log("Name3: " + name3);

name1 = "James";
name2 = "Wouter";

console.log("Name 1 value was changed ...");
console.log("Name1: " + name1);
console.log("Name2: " + name2);
console.log("Name3: " + name3);

let personA = { "name": "Willie" };
let personB = personA;

console.log(personA);
console.log(personB);

personA.surname = "Krause";
personB.town = "Cape Town";

console.log("Same object, but difference variable reference. Changing state of one, will change the state of the other ...");
console.log(personA);
console.log(personB);

personA = { "name": "Andries" };

console.log("Person A was assigned a TOTALLY NEW object, but the object attached to Person B, still exists ...");
console.log(personA);
console.log(personB);

console.log(' ')

console.log('--------------- PASS BY REFERENCE -----------------');


let hobby = "running";

function manipulateAndDisplayValue(hobbyName) {
    // PASS BY REFERENCE ===== hobbyName = hobby
    hobbyName = hobbyName + " is cool";
    console.log("Hobby name: " + hobbyName);
    console.log("Hobby: " + hobby); 
}

// console.log("Hobby name: " + hobbyName); // error: hobbyName is not defined

manipulateAndDisplayValue(hobby);


let hobbyObj = { "name": "running", "coolFactor": "awesomely cool" };

function manipulateAndDisplayObject(h) {
    // PASS BY REFERENCE ===== h = hobbyObj
    h.howCool = h.name + " is " + h.coolFactor;
    console.log(h.howCool); 
}

manipulateAndDisplayObject(hobbyObj);

console.log(hobbyObj.howCool); 