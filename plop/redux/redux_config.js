exports.reduxConfig = (data) => {
  const dirPath = `${__dirname}/../../src/redux`;
  const reduxTemplates = `${__dirname}/template`;
  let actions = [];

  if (data.create_or_modify === "create") {
    actions = [
      {
        type: "add",
        path: `${dirPath}/constants/{{properCase action_prefix}}Constants.js`,
        templateFile: `${reduxTemplates}/create/constants.js.hbs`,
      },
    ];
    let actionPath = `${dirPath}/actions/{{properCase action_prefix}}Actions.js`;
    actions = [
      ...actions,
      {
        type: "add",
        path: actionPath,
        templateFile: `${reduxTemplates}/create/action.js.hbs`,
      },
    ];

    // Create reducer
    if (data.reducer_confirm) {
      actions = [
        ...actions,
        {
          type: "add",
          path: `${dirPath}/reducers/{{properCase action_prefix}}Reducer.js`,
          templateFile: `${reduxTemplates}/create/reducer.js.hbs`,
        },
        // Add new reducer to the root reducer
        {
          type: "modify",
          path: `${dirPath}/reducers/index.js`,
          pattern: /\/\/plopImport/,
          templateFile: `${reduxTemplates}/create/rootReducer.js.hbs`,
        },
        {
          type: "modify",
          path: `${dirPath}/reducers/index.js`,
          pattern: /\/\/plopReducer/,
          template:
            "{{camelCase action_prefix}}:{{properCase action_prefix}},\n//plopReducer",
        },
        //Add Sagas
        {
          type: "add",
          path: `${dirPath}/sagas/{{properCase action_prefix}}Saga.js`,
          templateFile: `${reduxTemplates}/create/saga.js.hbs`,
        },
        {
          type: "modify",
          path: `${dirPath}/sagas/index.js`,
          pattern: /\/\/plopImport/,
          templateFile: `${reduxTemplates}/create/rootSaga.js.hbs`,
        },
        {
          type: "modify",
          path: `${dirPath}/sagas/index.js`,
          pattern: /\/\/plopSaga/,
          template: "{{properCase action_prefix}}(),\n//plopSaga",
        },
      ];
    }
  }
  if (data.create_or_modify === "modify") {
    let actionPath = `${dirPath}/actions/{{action}}.js`;

    console.log("🚀 ~ file: redux_config.js ~ line 70 ~ actionPath" + dirPath);
    let reducerPath = `${dirPath}/reducers/{{reducer_name}}.js`;
    let sagaPath = `${dirPath}/sagas/{{saga_name}}.js`;

    actions = [
      {
        type: "append",
        pattern: /\/\/plopImport/,
        path: `${dirPath}/constants/{{constant_name}}.js`,
        templateFile: `${reduxTemplates}/modify/constants.js.hbs`,
      },
    ];

    const actionType = "append";

    actions = [
      ...actions,
      {
        type: actionType,
        path: actionPath,
        pattern: /import {/,
        templateFile: `${reduxTemplates}/modify/actionImport.js.hbs`,
      },
      {
        type: actionType,
        path: actionPath,
        templateFile: `${reduxTemplates}/modify/action.js.hbs`,
      },
    ];

    if (data.reducer_confirm) {
      actions = [
        ...actions,
        {
          type: actionType,
          path: reducerPath,
          pattern: /import {/,
          templateFile: `${reduxTemplates}/modify/actionImport.js.hbs`,
        },
        {
          type: "modify",
          path: reducerPath,
          pattern: /\/\/plopImport/,
          templateFile: `${reduxTemplates}/modify/reducer.js.hbs`,
        },
      ];
    }
    if (data.saga_confirm) {
      actions = [
        ...actions,
        {
          type: "modify",
          path: sagaPath,
          pattern: /\/\/plopImportAction/,
          templateFile: `${reduxTemplates}/modify/sagaImportAction.js.hbs`,
        },
        {
          type: "modify",
          path: sagaPath,
          pattern: /\/\/plopImportConstant/,
          templateFile: `${reduxTemplates}/modify/sagaImportConstant.js.hbs`,
        },
        {
          type: "modify",
          path: sagaPath,
          pattern: /\/\/plopSaga/,
          templateFile: `${reduxTemplates}/modify/saga.js.hbs`,
        },
        {
          type: "modify",
          path: sagaPath,
          pattern: /\/\/plopExport/,
          templateFile: `${reduxTemplates}/modify/sagaExport.js.hbs`,
        },
      ];
    }
  }

  return actions;
};
