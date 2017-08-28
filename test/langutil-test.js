
var test = require('tape').test;


let convertUtil = require('../lib/lang');

let userData1 = require('./data/users.json');
let userData2 = require('./data/users2.json');
let qualificationData = require('./data/qualifications.json');



test('Test Map Conversion of userData1', function(assert) {

    let results = convertUtil.convertToMap(userData1, "id", "report_reply");
    
    let mapKeys = Object.keys(results.map);

    assert.equal(3, mapKeys.length, "Map has the correct size");
    assert.true(results.map["1234"], "Map item with ID 1234 found");
    assert.equal("Willie", results.map["1234"].name, "Map item with ID 1234 has correct object associated");

    assert.end();

});


test('Test Map Conversion of qualificationData', function (assert) {

    let results = convertUtil.convertToMap(qualificationData, "avodaId", "report_reply");
    
    let mapKeys = Object.keys(results.map);

    assert.equal(6, mapKeys.length, "Map has the correct size");
    assert.true(results.map["526-13-18974"], "Map item with ID 526-13-18974 found");
    assert.equal("RAU", results.map["526-13-18974"].institution, "Map item with ID 1234 has correct object associated");

    assert.end();

});





test('Test Map Conversion for userData2', function(assert) {

    let results = convertUtil.convertToMap(userData2, "idnumber", "report_reply");

    let mapKeys = Object.keys(results.map);

    assert.equal(4, mapKeys.length, "Map has the correct size");
    assert.equal(13,results.map["6402077262088"].idnumber.length, "ID number is valid length")

    assert.end();

});







/*
Manual type of tests


let results1 = convertUtil.convertToMap(userData1, "id", "report_reply");

let mapKeys = Object.keys(results1.map);
let expectedDuplicateErrorFound = false;
let expectedUniqueIdNotFoundError = false;

for (let error of results1.errors) {
    if (error.message.startsWith("Objects with duplicate IDs were encountered and ignored")) {
        expectedDuplicateErrorFound = true;
    }
    if (error.message.startsWith("An object without a unique ID field was encountered")) {
        expectedUniqueIdNotFoundError = true;
    }
}

expectedDuplicateErrorFound ? console.log('Duplicate ID check PASSED') : console.log('Duplicate ID check FAILED');

if (expectedUniqueIdNotFoundError) {
    console.log('Unique ID check PASSED');
} else {
    console.log('Unique ID check FAILED');
}

if (mapKeys.length === 3) {
    console.log('Map is of the expected size');
} else {
    console.log('Map is NOT of the expected size');
}

if (results1.map["1234"]) {
    console.log("Map item with ID 1234 found");
    if (results1.map["1234"].name === "Willie") {
        console.log("Map item with ID 1234 has correct object associated");
    } else {
        console.log("Map item with ID 1234 does not have correct object associated");
    }
} else {
    console.log("Map item with ID 1234 NOT found");
}


let results2 = convertUtil.convertToMap(qualificationData, "avodaId", "report_reply");

let mapKeys2 = Object.keys(results2.map);
let expectedDuplicateErrorFound2 = false;
let expectedUniqueIdNotFoundError2 = false;

if (results2.errors.length > 0) {
    console.log('Errors encountered in qualification data');
} else {
    console.log('Qualification data is ok');
}

*/