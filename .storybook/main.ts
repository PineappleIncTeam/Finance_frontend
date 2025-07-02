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
  ],
  staticDirs: ["../public"]
};

export default config;
