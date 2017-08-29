
let langUtil = require('../lib/lang');

let csvDataFile = "data/db.csv";
let jsonDataFile = require('../data/db.json');

let dateFormat = "YYYY-MM-DD";

let reporter = {

    getUsersForGivenBranch: function(branch) {

        let users = [];

        for (user of jsonDataFile) {
            console.log(user);
            users.push(user);
        }

        return users;

    },

    getUsersForGivenSupervisor: function(supervisor) {

    },

    getUserCountRE5ObtainedForGivenBranch: function(branch) {

    },

    getUserCountRE5NotObtainedForGivenBranch: function(branch) {
        
    },

    getUsersEmployedBefore2014: function() {

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