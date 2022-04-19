const path = require("path");
const toPath = (filePath) => path.join(process.cwd(), filePath);

module.exports = {
  addons: [
    "@storybook/preset-create-react-app",
    {
      name: "@storybook/addon-essentials",
      options: { backgrounds: false },
    },
    "storybook-dark-mode",
    "@storybook/addon-interactions",
    "storybook-react-intl",
  ],
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  features: {
    interactionsDebugger: true,
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "@emotion/core": toPath("node_modules/@emotion/react"),
        "emotion-theming": toPath("node_modules/@emotion/react"),
      },
    },
  }),
};
