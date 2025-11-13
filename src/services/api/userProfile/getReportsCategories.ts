import axios from "axios";

import { reportsCategoriesEndPoint } from "../auth/apiConstants";

export const getReportsCategories = async (baseUrl: string) => {
	return await axios(`${baseUrl}/${reportsCategoriesEndPoint}/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
