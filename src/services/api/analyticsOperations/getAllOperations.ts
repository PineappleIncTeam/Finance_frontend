import axios from "axios";

import { GetUserOperationsEndpoint } from "./apiConstants";

export const getUserOperations = async (baseURL: string) => {
	return await axios(`${baseURL}/${GetUserOperationsEndpoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
	
};