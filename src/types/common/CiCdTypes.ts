import { Proc } from "pm2";

interface INextProc extends Proc {
	script: string;
	args: string[];
	watch: boolean;
	env: object;
}

export type EcosystemConfig = {
	apps: INextProc[];
};
