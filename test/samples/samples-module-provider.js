
let moment = require('moment');

let loginAttempts = [];
let loginAttemptsCounter = 0;

function performLogin(username, password) {
    loginAttemptsCounter = loginAttemptsCounter+1;
    if ((username === 'abc') && (password === 'xyz')) {
        loginAttempts.push('Login SUCCESS for user "' + username + '" (' + moment().valueOf() + ')');
        return true;
    } else {
        loginAttempts.push('Login FAILED for user "' + username + '" (' + moment().valueOf() + ')');
        return false;
    }
}

function getLoginCount() {
    return loginAttemptsCounter;
}

function printLoginAttempts() {
    for (loginAttempt of loginAttempts) {
        console.log(loginAttempt);
    }
}

exports.login = performLogin;
exports.getLoginCount = getLoginCount;

