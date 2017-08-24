#!/usr/bin/env node

let convertUtil = require('../lib/lang');
let users = require('./data/users.json');

let results = convertUtil.convertToMap(users, "id", "report_log");
console.log(results);




