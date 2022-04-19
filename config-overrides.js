const { override, useBabelRc, addBundleVisualizer } = require("customize-cra");

module.exports = {
  jest: (config) => {
    // Return the custom jest config
    return {
      ...config,
      collectCoverageFrom: [
        ...config.collectCoverageFrom,
        // Exclusions
        "!src/**/*.stories.tsx",
        "!src/mocks/*.ts",
        "!src/**/index.ts",
        "!src/**/index.tsx",
      ],
    };
  },
  // eslint-disable-next-line
  webpack: override(useBabelRc(), addBundleVisualizer({}, true)),
};
