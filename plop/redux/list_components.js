const fs = require("fs");

module.exports = (type = "actions") => {
  try {
    const names = fs.readdirSync("src/redux/" + type);
    return names.map((i) => i.replace(".js", ""));
  } catch (e) {
    console.error(e);
  }
};
