#!/usr/bin/env node

const m = require('moment');

let date = m('2020-02-02');

console.log(date.add(10, 'months').format('YYYY-MM-DD'));
