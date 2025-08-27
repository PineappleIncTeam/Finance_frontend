import type { Preview } from "@storybook/nextjs";

import "../src/app/reset.css";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;