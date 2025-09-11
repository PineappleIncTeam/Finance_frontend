/* eslint-disable camelcase */
import { EcosystemConfig } from "./src/types/common/CiCdTypes";

const config: EcosystemConfig = {
	apps: [
		{
			name: "nextjs-app",
			script: "npm",
			args: ["start"],
			instances: 1,
			exec_mode: "fork",
			autorestart: true,
			watch: false,
			env: {
				NODE_ENV: "production",
			},
		},
		{
			name: "storybook",
			script: "npm",
			args: ["run", "sb:prod"],
			instances: 1,
			exec_mode: "fork",
			autorestart: true,
			watch: false,
			env: {
				NODE_ENV: "production",
			},
		},
	],
};

export default config;
