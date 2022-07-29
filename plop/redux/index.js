const reduxConfig = require("./redux_config.js");
const list_components = require("./list_components");
module.exports = {
  description: "Add New Redux Action",
  prompts: [
    {
      type: "list",
      name: "create_or_modify",
      message: "Do you wanto create new action, or modify existing one?",
      choices: () => [
        { name: "Create (Will create new action file)", value: "create" },
        { name: "Modify (Will add action to existing one)", value: "modify" },
      ],
    },
    {
      type: "list",
      name: "action",
      message: "Select Action Folder",
      when: ({ create_or_modify }) => {
        return create_or_modify === "modify";
      },
      choices: list_components("actions"),
    },
    {
      type: "input",
      name: "action_prefix",
      message: "Action prefix (e.g. 'user'):",
      when: ({ create_or_modify }) => {
        return create_or_modify === "create";
      },
      validate: (value) => {
        if (!value) {
          return "Name is Required";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "action_name",
      message: "Action name : (e.g 'GetUser')",
      validate: (value) => {
        if (!value) {
          return "Name is Required";
        }
        return true;
      },
    },
    {
      type: "confirm",
      name: "reducer_confirm",
      message: "Do you want to import actions into reducer?",
    },
    {
      type: "list",
      name: "reducer_name",
      message: "Select Reducer",
      choices: list_components("reducers"),
      when: ({ reducer_confirm, create_or_modify }) => {
        return create_or_modify === "modify" && reducer_confirm;
      },
    },
    {
      type: "list",
      name: "constant_name",
      message: "Select Constant",
      choices: list_components("constants"),
      when: ({ reducer_confirm, create_or_modify }) => {
        return create_or_modify === "modify";
      },
    },
    {
      type: "confirm",
      name: "saga_confirm",
      message: "Do you want to add Saga function?",
    },
    {
      type: "list",
      name: "saga_name",
      message: "Select Saga File",
      choices: list_components("sagas"),
      when: ({ saga_confirm, create_or_modify }) => {
        return create_or_modify === "modify" && saga_confirm;
      },
    },
  ],
  actions: (data) => reduxConfig.reduxConfig(data),
};
