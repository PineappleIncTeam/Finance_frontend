import axios from "axios";

import { getUserCategoriesEndpoint } from "./apiConstants";

export const getUserCategories = async (baseURL: string) => {
	return await axios(`${baseURL}/${getUserCategoriesEndpoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
	
};
