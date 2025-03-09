import axios from "axios";

import { UserOperationEndpoint } from "./apiConstants";

export const getUserOperations = async (baseURL: string) => {
	return await axios(`${baseURL}/${UserOperationEndpoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
	
};
