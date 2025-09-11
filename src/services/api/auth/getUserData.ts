import axios from "axios";

import { validateTokenEndpoint } from "./apiConstants";

export const getUserData = async (baseURL: string) => {
	return await axios(`${baseURL}/${validateTokenEndpoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};