export default {
    className: "job",
    fields: {
        image: {type: "Object"},
        title: {type: "String"},
        description: {type: "String"},
        location: {type: "String"},
        coordinate: {type: "GeoPoint"},
        company: {type: "Relation", targetClass: "company"},
        openPositions: {type: "String"},    
        preferences: {type: "Object"},
        jobType: {type: "String"},
        payType: {type: "String"},
        workingDays: {type: "Array"},
        workingPeriods: {type: "Array"},
        workingHours: {type: "Number"},
        workingStartDate: {type: "Date"},
        workingEndDate: {type: "Date"},
        views: {type: "Array"},
        applicants: {type: "Array"},
    }
    



}
// preferenceGender: {type: "String"},
    // preferenceNationality: {type: "String"},

// Array must be in double quote
//{type: "Relation", targetClass: "_User"}

//{type: "Array"}


// {
//        "opponents": {
//          "__op": "AddRelation",
//          "objects": [
//            {
//              "__type": "Pointer",
//              "className": "Player",
//              "objectId": "Vx4nudeWn"
//            }
//          ]
//        }
//      }