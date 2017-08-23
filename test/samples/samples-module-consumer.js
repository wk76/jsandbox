#!/usr/bin/env node

let authUtil = require('./samples-module-provider');

authUtil.login('willie', 'blah');
authUtil.login('abc', 'blah');
authUtil.login('abc', 'xyz');

console.log('There was ' + authUtil.getLoginCount() + ' login attempts');

// authUtil.printLoginAttempts();

