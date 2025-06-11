import * as VKID from "@vkid/sdk";
import pkceChallenge from "pkce-challenge";

import { UserProfilePath } from "../services/router/routes";
import { getCorrectBaseUrl } from "../utils/baseUrlConverter";

const generateCodeChallenge = async (): Promise<string> => {
	const challenge = await pkceChallenge();
	return challenge.codeChallenge;
};

export const vkIdConfig = VKID.Config.init({
	app: Number(process.env.CLIENT_ID),
	redirectUrl: `${getCorrectBaseUrl()}${UserProfilePath.ProfitMoney}`,
	state: String(generateCodeChallenge()),
	codeChallenge: String(generateCodeChallenge()),
	scope: "emil phone",
});
