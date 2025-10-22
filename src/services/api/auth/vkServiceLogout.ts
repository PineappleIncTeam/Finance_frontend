import axios from "axios";

import { vkLogoutEndpoint } from "./apiConstants";

export const vkLogoutUser = async (baseURL: string) => {
	return await axios(`${baseURL}/${vkLogoutEndpoint}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
