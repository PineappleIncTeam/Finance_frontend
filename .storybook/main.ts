import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
    "../src/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-onboarding"
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  staticDirs: ["../public"],
  // Добавляем переопределение publicPath:
  webpackFinal: async (config, { configType }) => {
    if (config.output) {
      config.output.publicPath = "/sb/";
    }
    return config;
  }
};

export default config;
