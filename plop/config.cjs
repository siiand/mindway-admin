// config.js

const { viewConfig } = require("./view");
const { reduxConfig } = require("./redux");

module.exports = {
  // Prompts

  actions: (data) => {
    return data.select === "view_component"
      ? viewConfig(data)
      : reduxConfig(data);
  },
};
