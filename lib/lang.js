
function convertToMap(arrayData, uniqueIdField, errorHandlingType) {
    
        let userMap = {};
        let errors = [];
    
        for (let obj of arrayData) {
    
            if (obj[uniqueIdField]) {
    
                // uniqueIdField is a valid value
                
                if (!userMap.hasOwnProperty(obj[uniqueIdField])) {
    
                    // all good
                    userMap[obj[uniqueIdField]] = obj;
    
                } else {
    
                    // the value of uniqueIdField already exists in the map, so this is a duplicate
                    if (errorHandlingType == "fatal_exit") {
                        throw new Error("Objects with duplicate IDs were encountered and ignored"); 
                    } else if (errorHandlingType == "report_reply") {
                        errors.push({ message: "Objects with duplicate IDs were encountered and ignored", obj: obj });
                    } else {
                        console.log("Objects with duplicate IDs were encountered and ignored. Duplicate ID: " + obj[uniqueIdField]);
                    }
    
                }
    
            } else {
    
                // uniqueIdField is NOT a valid value 
                if (errorHandlingType == "fatal_exit") {
                    throw new Error("An object without a unique ID field was encountered and ignored"); 
                } else if (errorHandlingType == "report_reply") {
                    errors.push({ message: "An object without a unique ID field was encountered and ignored", obj: obj });
                } else {
                    console.log("An object without a unique ID field was encountered and ignored");
                }
    
            }
    
        }
    
        if (errorHandlingType == "report_reply") {
            return { map: userMap, errors: errors }
        } else {
            return userMap;
        }
    
    }

exports.convertToMap = convertToMap;


