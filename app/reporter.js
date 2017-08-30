
let moment = require('moment');
let langUtil = require('../lib/lang');
let csvDataFile = "data/db.csv";
let jsonDataFile = require('../data/db.json');
let dateFormat = "YYYY-MM-DD";

let reporter = {

    formatDate: function (arrayInput, dateFieldName) {
        for (obj of arrayInput) {
            let dateIn = obj[dateFieldName];
            obj[dateFieldName] = moment(dateIn, ["DD-MM-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "YYYY/MM/DD"], true).format(dateFormat);
        }
        return arrayInput;
    },

    filterOn: function (filterLabel, filterValue) {
        let users = [];
        for (user of this.formatDate(jsonDataFile, "DATE OF EMPLOYMENT")) {
            if (user[filterLabel] === filterValue)
                users.push(user);
        }
        return users;
    },

    getUsersForGivenBranch: function (branch) {
        let reportOut = this.filterOn("BRANCH", branch);
        return reportOut;
    },

    getUsersForGivenSupervisor: function (supervisor) {
        let reportOut = this.filterOn("SUPERVISOR", supervisor);
        return reportOut;
    },

    getUserCountRE5ObtainedForGivenBranch: function (branch) {
        let userCount = 0, branchUsers = this.filterOn("BRANCH", branch)
        for (i of branchUsers) {
            if (i["RE (5)"] === "YES")
                userCount++;
        }
        return userCount;
    },

    getUserCountRE5NotObtainedForGivenBranch: function (branch) {
        let userCount = 0, branchUsers = this.filterOn("BRANCH", branch)
        for (i of branchUsers) {
            if (i["RE (5)"] !== "YES")
                userCount++;
        }
        return userCount;
    },

    getUsersEmployedBeforeDate: function (date) {
        let users = [];
        for (user of this.formatDate(jsonDataFile, "DATE OF EMPLOYMENT")) {
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



/*
getUsersForGivenBranch: function(branch) {
            let users = [];
            langUtil.csvToJson(csvDataFile, ['branch', 'advisorName', 'idnumber', 'employmentDate', 're5', 'qualification', 'supervisor']).then(data => {
                // .... users.push(user);
            }); 
            return users;
}
*/