import axios from "axios";

import { logoutEndpoint } from "./apiConstants";

export const baseLogoutUser = async (baseURL: string) => {
	return await axios(`${baseURL}/${logoutEndpoint}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
