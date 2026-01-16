import axios from "axios";

import { reportsStatisticsEndPoint } from "../auth/apiConstants";

export const getReportsStatistics = async (baseUrl: string) => {
	return await axios(`${baseUrl}/${reportsStatisticsEndPoint}/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
