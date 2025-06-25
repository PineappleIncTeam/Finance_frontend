import * as VKID from "@vkid/sdk";

import { UserProfilePath } from "../services/router/routes";
import { getCorrectBaseUrl } from "../utils/baseUrlConverter";
import { generateCodeChallenge, generateState } from "../utils/generateAuthTokens";

export const vkIdConfig = VKID.Config.init({
	app: Number(process.env.NEXT_PUBLIC_VK_APP_ID),
	redirectUrl: `${getCorrectBaseUrl()}${UserProfilePath.ProfitMoney}`,
	state: generateState(),
	codeChallenge: String(generateCodeChallenge()),
	scope: "email phone",
});

export const vkAuthLogin = VKID.Auth.login({});
