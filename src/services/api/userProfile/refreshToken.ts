import axios from "axios";

import { refreshTokenEndpoint } from "../auth/apiConstants";

export const refreshToken = async (baseURL: string) => {
	const tenSeconds = 10000;

	const controller = new AbortController();
	setTimeout(() => controller.abort(), tenSeconds);

	return await axios(`${baseURL}/${refreshTokenEndpoint}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: false,
		signal: controller.signal,
	});
};
