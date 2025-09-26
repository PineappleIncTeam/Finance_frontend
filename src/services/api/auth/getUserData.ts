import axios from "axios";

import { getUserDataEndpoint } from "./apiConstants";

export const getUserData = async (baseURL: string) => {
	return await axios(`${baseURL}/${getUserDataEndpoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
