import axios from "axios";

import { reportsBalanceEndPoint } from "../auth/apiConstants";

export const getReportsBalance = async (baseUrl: string) => {
	return await axios(`${baseUrl}/${reportsBalanceEndPoint}/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
