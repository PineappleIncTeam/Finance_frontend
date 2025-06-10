import * as VKID from "@vkid/sdk";

export const vkIdConfig = VKID.Config.init({
	app: Number(process.env.CLIENT_ID),
	redirectUrl: process.env.REDIRECT_URL,
	state: process.env.STATE,
	codeChallenge: process.env.CODE_CHALLENGE,
	scope: "emil phone",
});
