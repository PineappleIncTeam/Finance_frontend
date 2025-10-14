/* eslint-disable camelcase */
import { EcosystemConfig } from "./src/types/common/CiCdTypes";

const config: EcosystemConfig = {
	apps: [
		{
			name: "storybook",
			script: "http-server",
			args: ["./storybook-static", "-p", "8085"],
			instances: 1,
			exec_mode: "fork",
			autorestart: true,
			watch: false,
			env: {
				NODE_ENV: "production",
			},
		},
		{
			name: "typedoc",
			script: "http-server",
			args: ["./docs", "-p", "8086"],
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