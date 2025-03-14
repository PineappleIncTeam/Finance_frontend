import axios from "axios";

import { getCategoryOptionsEndPoint } from "../auth/apiConstants";

export const GetCategoryOptions = async (baseUrl: string) => {
	return await axios(`${baseUrl}/${getCategoryOptionsEndPoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
