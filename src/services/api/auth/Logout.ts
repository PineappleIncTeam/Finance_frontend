import axios from "axios";

import { logoutEndpoint } from "./apiConstants";

export const logoutUser = async (baseURL: string) => {
	return await axios(`${baseURL}/${logoutEndpoint}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
};
