/* eslint-disable camelcase */
import { EcosystemConfig } from "./src/types/common/CiCdTypes";

const config: EcosystemConfig = {
	apps: [
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
