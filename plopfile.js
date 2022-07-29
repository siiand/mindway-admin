//const config = require("./plop/config.cjs");
const viewGenerator = require("./plop/view/index.js");
const reduxGenerator = require("./plop/redux");

const config = function (plop) {
  plop.setGenerator("redux", reduxGenerator);
  plop.setGenerator("views", viewGenerator);
};

module.exports = config;
