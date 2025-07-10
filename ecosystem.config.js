"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
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
};
exports.default = config;
