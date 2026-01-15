import axios, { AxiosResponse } from "axios";

import { IStatistics } from "../../../types/api/Reports";

import { statisticsEndpoint } from "../auth/apiConstants";

export const getStatistics = async (baseUrl: string): Promise<AxiosResponse<IStatistics>> => {
	return await axios(`${baseUrl}/${statisticsEndpoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
