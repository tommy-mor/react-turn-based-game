// export the autogenerated interface
const { spec } = require("./api");
// flatten the nested object - we don't care about 'return type' externally!
const exp = Object.keys(spec).reduce((acc, key) => {
  return {
    ...acc,
    ...nestedClasses[key],
  };
}, {});
module.exports = exp;
