
let moment = require('moment');
let langUtil = require('../lib/lang');
let csvDataFile = "data/db.csv";
let jsonDataFile = require('../data/db.json');
let dateFormat = "YYYY-MM-DD";


function formatDate(arrayInput, dateFieldName) {
    for (obj of arrayInput) {
        let dateIn = obj[dateFieldName];
        obj[dateFieldName] = moment(dateIn, ["DD-MM-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "YYYY/MM/DD"], true).format(dateFormat);
    }
    return arrayInput;
}

function filterOn(data, filterLabel, filterValue) {
    let users = [];
    for (user of data) {
        if (user[filterLabel] === filterValue) 
            users.push(user);
    }
    return users;
}

function getData() {
    return formatDate(jsonDataFile, "DATE OF EMPLOYMENT");
}

function getDataAsync() {
    return new Promise(function (resolve, reject) {
        // asynchronous code to run here
        // call resolve() to indicate task successfully completed
        // call reject() to indicate task has failed 
        langUtil.csvToJson(csvDataFile, ['branch', 'advisorName', 'idnumber', 'employmentDate', 're5', 'qualification', 'supervisor']).then(data => {
            formatDate(data, 'employmentDate');
            resolve(data);
        });
    });
}


let reporter = {

    getUsersForGivenBranch: function (branch) {
        return new Promise(function (resolve, reject) {
            getDataAsync().then((data) => {
                let reportOut = filterOn(data, "branch", branch);
                resolve(reportOut);
            });
        });    
    },

    getUsersForGivenSupervisor: function (supervisor) {
        let reportOut = filterOn(getData(), "SUPERVISOR", supervisor);
        return reportOut;
    },

    getUserCountRE5ObtainedForGivenBranch: function (branch) {
        let userCount = 0, branchUsers = filterOn(getData(), "BRANCH", branch)
        for (i of branchUsers) {
            if (i["RE (5)"] === "YES")
                userCount++;
        }
        return userCount;
    },

    getUserCountRE5NotObtainedForGivenBranch: function (branch) {
        let userCount = 0, branchUsers = filterOn(getData(), "BRANCH", branch)
        for (i of branchUsers) {
            if (i["RE (5)"] !== "YES")
                userCount++;
        }
        return userCount;
    },

    getUsersEmployedBeforeDate: function (date) {
        let users = [];
        for (user of getData()) {
            let getValidDate = moment(user["DATE OF EMPLOYMENT"], "YYYY-MM-DD");
            if (getValidDate.isValid()) {
                if (moment(user["DATE OF EMPLOYMENT"]) < moment(date))
                    users.push(user);
            }
        }

        return users;
    }
}


exports.reporter = reporter;
