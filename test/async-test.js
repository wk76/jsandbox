
var test = require('tape').test;

let langUtil = require('../lib/lang');


test('SYNC Test', function (assert) {


    let randomInteger1 = langUtil.getRandomIntSync(0, 50);

    console.log('RANDOM INT: ' + randomInteger1);

    console.log("STEP A");

    let randomInteger2 = langUtil.getRandomIntSync(0, 50);

    console.log('RANDOM INT: ' + randomInteger2);

    console.log("STEP B");

    let randomInteger3 = langUtil.getRandomIntSync(0, 50);

    console.log('RANDOM INT: ' + randomInteger3);

    console.log("STEP C");

    assert.end();

});

/*
test('ASYNC Test 1', function (assert) {

    let randomInteger1 = langUtil.getRandomIntAsync(0, 50);

    console.log('RANDOM INT: ' + randomInteger1);

    console.log("STEP A");

    let randomInteger2 = langUtil.getRandomIntAsync(0, 50);

    console.log('RANDOM INT: ' + randomInteger2);

    console.log("STEP B");

    let randomInteger3 = langUtil.getRandomIntAsync(0, 50);

    console.log('RANDOM INT: ' + randomInteger3);

    console.log("STEP C");

    randomInteger2.then((value) => {
        console.log('PROMISE HANDLER INT: ' + value);
    });

    assert.end();

});
*/

test('ASYNC Test 2', function (assert) {

    langUtil.getCharAfterRandomTimeDelay('A').then((value) => {
        console.log('CHAR: ' + value);
    });

    console.log("STEP A");

    langUtil.getCharAfterRandomTimeDelay('B').then((value) => {
        console.log('CHAR: ' + value);
    });

    console.log("STEP B");

    langUtil.getCharAfterRandomTimeDelay('C').then((value) => {
        console.log('CHAR: ' + value);
    });

    console.log("STEP C");



    assert.end();

});




