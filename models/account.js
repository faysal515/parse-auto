/*
* modifying the existing user table schema
*
* */

export default {
  className: "_User",
  fields: {
    avatar: {
      type: "Object"
    },
    first_name: {type: "String"},
    last_name: {type: "String"},
    accountType: {type: "String"},
    country: {type: "String"},
    zip: {type: "Number"},
    locations: {type: "GeoPoint"},
    online: {type: "Boolean"},
    device: {type: "Object"}
  }

}
