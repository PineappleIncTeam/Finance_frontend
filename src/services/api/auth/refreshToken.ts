import axios from "axios";

import { refreshTokenEndpoint } from "./apiConstants";

export const refreshToken = async (baseURL: string) => {
	return await axios(`${baseURL}/${refreshTokenEndpoint}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
