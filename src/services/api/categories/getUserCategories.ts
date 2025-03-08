import axios from "axios";

import { UserCategoriesEndpoint } from "./apiConstants";

export const getUserCategories = async (baseURL: string) => {
	return await axios(`${baseURL}/${UserCategoriesEndpoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
	
};
