#!/usr/bin/env node

let moment = require('moment');
let reporter = require('./reporter').reporter;



let printResults = function (resultSet, heading) {
    let headerpadding = '-------------------------------------------------------------------'
    heading ? console.log(headerpadding.substring(1,5) + ' ' + heading + ' ' + headerpadding.substring(1, headerpadding.length - heading.length )) : '';
    if (Array.isArray(resultSet)) {
        for (result of resultSet)
        { console.log(result); }
    } else {
        console.log(resultSet);
    }
    heading ? console.log(' ') : '';
};



reporter.getUsersForGivenBranch('Atron Durban').then((durbanUsers) => {
    printResults(durbanUsers, "USERS FOR DURBAN");
});

let gautengUsers = reporter.getUsersForGivenBranch('Gauteng');
printResults(gautengUsers, "USERS FOR GAUTENG");

let supervisorWarrenAllanUsers = reporter.getUsersForGivenSupervisor('Warren Allan');
printResults(supervisorWarrenAllanUsers, "USERS FOR SUPERVISOR WARREN ALLAN");

let totalGautengUsersRE5Obtained = reporter.getUserCountRE5ObtainedForGivenBranch('Gauteng');
printResults(totalGautengUsersRE5Obtained, "TOTAL GAUTENG USERS WITH RE5 OBTAINED");

let totalGautengUsersRE5NotObtained = reporter.getUserCountRE5NotObtainedForGivenBranch('Gauteng');
printResults(totalGautengUsersRE5NotObtained, "TOTAL GAUTENG USERS WITH RE5 OUTSTANDING");

let usersEmployedBefore2014 = reporter.getUsersEmployedBeforeDate('2014-01-02');
printResults(usersEmployedBefore2014, "USERS EMPLOYED BEFORE 2014");

