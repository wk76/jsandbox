#!/usr/bin/env node

let moment = require('moment');
let langUtil = require('../lib/lang');
let csvDataFile = "../data/db.csv";
let jsonDataFile = require('../data/db.json');
let userService = require("./user-service.js").userService;

let sampleUser = { "branch": "Polokwane", "advisorName": "Bruce Lee", "idnumber": "7606075213089", "employmentDate": "2014-06-01", "re5": "NO", "qualification": "", "supervisor": "Jackie Chan" }
let sampleUserNew = { "branch": "Gauteng", "advisorName": "Bruce Lee", "idnumber": "7606075213089", "employmentDate": "2014-06-01", "re5": "NO", "qualification": "", "supervisor": "Jackie Chan" }

function getDataCSV() {
    return new Promise(function (resolve, reject) {
        langUtil.csvToJson(csvDataFile, ['branch', 'advisorName', 'idnumber', 'employmentDate', 're5', 'qualification', 'supervisor']).then(data => {
            resolve(data);
        });
    });
}

/*
// Create user (single)
userService.createUser(sampleUser).then(
    error => {
        if (error !== false) {
            console.log(error);
        } else {
            console.log("User with ID Number " + sampleUser.idnumber + " successfully created");
        }
    }
);

// Create users (multiple)
getDataCSV().then(
    users => {
        userService.createUsers(users)
            .then(result => {
                console.log(result);
            });
    });


// Fetch user
userService.fetchUser('8707015044086').then((users) => {
    console.log(users);
});


// Fetch all users
userService.fetchUsersAll().then((users) => {
    console.log(users);
});



// Fetch users branch
userService.fetchUsersBranch('Gauteng').then((users) => {
    console.log(users);
});
*/

// Count users per branch
userService.countUsersPerBranch().then((users) => {
    console.log(users);
});


/*
// Update user
userService.updateUser('7606075213089', sampleUserNew).then((status) => {
    console.log(status);
});

// Delete user
userService.deleteUser('7606075213089').then((status) => {
    console.log(status);
});

// Check if ID exists
userService._idnumberExists('7606075213089').then((status) => {
    console.log(status);
});

// Check if ID is valid
if (userService.idnumberValidation('7606075213089')) {
    console.log("ID Number is valid"); } else { 
        console.log("ID Number is not valid");
    }
*/