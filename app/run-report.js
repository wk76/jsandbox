#!/usr/bin/env node

let reporter = require('./reporter').reporter;

let printUsers = function(users, branch) {
    branch ? console.log('------------ ' + branch + ' ------------') : '';
    for (user of users) {
        console.log(user);
    }
    branch ? console.log(' ') : '';
}

let durbanUsers = reporter.getUsersForGivenBranch('Atron Durban');
printUsers(durbanUsers, "DURBAN");

let gautengUsers = reporter.getUsersForGivenBranch('Gauteng');
printUsers(durbanUsers, "GaUTENG");

