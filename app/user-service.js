
let moment = require('moment');
let langUtil = require('../lib/lang');

// Arango connection for database: jsandbox, collection: users
let db = require('arangojs')('http://root:C@rrau100@localhost:8529');
db.useDatabase('jsandbox');
let collectionUsers = db.collection('users');
let collectionUsersError = db.collection('usersError');
let aqlQuery = require('arangojs').aqlQuery;



let userService = {

    createUser: function (user) {
        return new Promise((resolve, reject) => {
            this.formatDate(user, "employmentDate", "YYYY-MM-DD");
            if (this.idnumberValidation(user["idnumber"])) {
                user._key = user["idnumber"];
                db.query(aqlQuery`
                UPSERT {idnumber: ${user["idnumber"]}} INSERT ${user} REPLACE ${user} IN users
                `).then(error => { resolve(false); })
            } else {
                user.error = "Invalid ID Number";
                user.errorTimestamp = Date();
                collectionUsersError.save(user);
                resolve("Failed to create user with ID Number " + user.idnumber + " with error " + user.error);
            };
        });
    },

    createUsers: function (users) {
        return new Promise((resolve, reject) => {
            let promises = [];
            for (user of users) {
                promises.push(this.createUser(user));
            }
            Promise.all(promises);
            resolve("Finished creating users"),
                reject("Failed creating users")
        });
    },

    fetchUser: function (idnumber) {
        return new Promise((resolve, reject) => {
            db.query(aqlQuery`
            FOR user IN users FILTER user["idnumber"] == ${idnumber} RETURN user 
            `).then((results) => {
                    resolve(results._result);
                });
        });

    },

    updateUser: function (idnumber, user) {
        return new Promise((resolve, reject) => {
            collectionUsers.update(idnumber, user);
            resolve('User with ID NUmber ' + idnumber + ' updated successfully'),
                reject('Failed to update user with ID Number ' + idnumber)
        });
    },

    deleteUser: function (idnumber) {
        return new Promise((resolve, reject) => {
            collectionUsers.remove(idnumber);
            resolve('User with ID Number ' + idnumber + ' successfully deleted'),
                reject('Failed to delete user with ID Number ' + idnumber)
        });

    },

    _idnumberExists: function (idnumber) {
        return new Promise((resolve, reject) => {
            db.query(aqlQuery`
            FOR user IN users FILTER user["idnumber"] == ${idnumber} RETURN user.idnumber 
            `).then((results) => {
                    if (results._result[0] === idnumber) {
                        resolve("ID Number exists");
                    } else {
                        resolve("ID Number does not exist");
                    }
                });
        });

    },

    idnumberValidation: function (idNumber) {
        let idStr = idNumber.toString();
        if (idStr.length === 13) {
            if (moment(idStr.substring(0, 6), "YYMMDD", true).isValid()) {
                let oddNumbers = [];
                let evenNumbers = [];
                let evenNumbersMultiplied = [];
                let invalidIDNumbers = [];
                for (n = 0; n < 12; n += 2) {
                    oddNumbers.push(Number(idStr.substring(n, n + 1)));
                }
                for (n = 1; n < 13; n += 2) {
                    evenNumbers.push(idStr.substring(n, n + 1));
                }
                let sumOddNumbers = oddNumbers.reduce(function (a, b) { return a + b });
                let concatEvenNumbers = evenNumbers.join('');
                let multiplyEvenNumbers = (Number(concatEvenNumbers) * 2).toString()
                for (n = 0; n < multiplyEvenNumbers.length; n++) {
                    evenNumbersMultiplied.push(Number(multiplyEvenNumbers.substring(n, n + 1)));
                }
                let sumEvenNumbers = evenNumbersMultiplied.reduce(function (a, b) { return a + b });
                let sumOddEven = sumOddNumbers + sumEvenNumbers;
                let checksumDigit = (10 - (sumOddEven % 10));
                if (checksumDigit.toString() === idStr.substring(12)) {
                    return true;
                } else {
                    // throw new Error("Invalid ID Number: Control digit error");
                    return false;
                }
            } else {
                // throw new Error("Invalid ID Number: Date of Birth error");
                return false;
            }
        } else {
            // throw new Error("Invalid ID Number: Length error");
            return false;
        }
    },

    formatDate: function (obj, dateFieldName, dateFormat) {
        let dateIn = obj[dateFieldName];
        obj[dateFieldName] = moment(dateIn, ["DD-MM-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "YYYY/MM/DD"], true).format(dateFormat);
        return obj;
    },

}

exports.userService = userService;