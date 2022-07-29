/**
 * View Generator
 */

module.exports = {
  description: "Add a View",
  prompts: [
    {
      type: "input",
      name: "view_name",
      message: "what is the name of the view ( NewImageCarousel )",
    },
    {
      type: "confirm",
      name: "wantNavigationBar",
      default: false,
      message: "Do you want to add to Navigation Bar",
    },
  ],
  actions: (data) => {
    const actions = [
      {
        type: "add",
        path: "src/views/app-views/{{dashCase view_name}}/index.js",
        templateFile: "plop/view/view_template.hbs",
        abortOnFail: true,
      },
    ];

    actions.push({
      type: "modify",
      pattern: "{/*APPROUTE*/}",
      template:
        "<Route path={`${APP_PREFIX_PATH}/{{dashCase view_name}}`} component={lazy(() => import(`./{{dashCase view_name}}`))} />\n{/*APPROUTE*/}",
      path: "src/views/app-views/index.js",
      abortOnFail: true,
    });

    // If api needs model,route and controller
    if (data.wantNavigationBar) {
      actions.push({
        type: "modify",
        pattern: "//NavigationConst",
        path: "src/configs/NavigationConfig.js",
        template:
          "const {{view_name}}NavTree = [{ key: '{{dashCase view_name}}',path: `${APP_PREFIX_PATH}/{{dashCase view_name}}`,title: '{{view_name}}',icon: UserOutlined,breadcrumb: false,submenu: []}] \n //NavigationConst",
        abortOnFail: true,
      });
      actions.push({
        type: "modify",
        pattern: "//NavigationConfig",
        path: "src/configs/NavigationConfig.js",
        template: "...{{view_name}}NavTree, \n //NavigationConfig",
        abortOnFail: true,
      });
    }
    return actions;
  },
};
