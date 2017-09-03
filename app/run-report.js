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

reporter.getUsersForGivenBranch('Gauteng').then((gautengUsers) => {
    printResults(gautengUsers, "USERS FOR GAUTENG");
});

reporter.getUsersForGivenSupervisor('Warren Allan').then((warrenSuperVisor) => {
    printResults(warrenSuperVisor, "USERS FOR SUPERVISOR WARREN ALLAN");
});

reporter.getUserCountRE5ObtainedForGivenBranch('Gauteng').then((countResult) => {
    printResults(countResult,"TOTAL GAUTENG USERS WITH RE5 OBTAINED");
});


reporter.getUserCountRE5NotObtainedForGivenBranch('Gauteng').then((countResult) => {
    printResults(countResult, "TOTAL GAUTENG USERS WITH RE5 OUTSTANDING");
});

reporter.getUsersEmployedBeforeDate('2014-01-02').then((usersEmployedBefore2014) => {
    printResults(usersEmployedBefore2014, "USERS EMPLOYED BEFORE 2014");
});

