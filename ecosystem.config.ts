/* eslint-disable camelcase */
import { Proc } from "pm2";

interface INextProc extends Proc {
  script: string;
  args: string[];
  watch: boolean;
  env: object
}

type EcosystemConfig = {
  apps: INextProc[]
}

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
      }
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
      }
    }
  ]
}

export default config;
