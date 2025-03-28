import axios from "axios";

import { GetUserReportsEndpoint } from "./apiConstants";

export const getUserReports = async (baseURL: string) => {
	return await axios(`${baseURL}/${GetUserReportsEndpoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
	
};