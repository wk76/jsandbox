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

console.log('--------------- ARRAY ITERATION -----------------');

//
// the "of" iterator will iterate over the contents of an ARRAY
//

let ingredients = [ 'Meat', 'Potatoes' ];   // array of strings
let numbers = [ 1, 4, 20.3 ];               // array of numbers
let users = [ user, user2 ];                // array of objects

/*
let userMap = {
    "1": { ... Willie },
    "2": { .... Andries },
}
*/

for (let ingredient of ingredients) {
    console.log(ingredient);
}

console.log(' ')

for (let number of numbers) {
    console.log(number);
}

console.log(' ')

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


console.log('--------------- OBJECT ITERATION -----------------');

//
// the "in" iterator will iterate over the contents of an OBJECT/MAP
//

for (let key in user) {
    console.log(key);
}

let keys = Object.keys(user);

console.log(keys);

console.log('User has key "name" : ' + user.hasOwnProperty('name'));
console.log('User has key "hobbies" : ' + user.hasOwnProperty('hobbies'));
