export default {
  className: "company",
  fields: {
    name: {type: "String"},
    avatar: {
      type: "Object"
    },
    users: {type: "Relation", targetClass: "_User"},
    industry: {type: "String"}
  }

}