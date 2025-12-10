import axios, { AxiosResponse } from "axios";

import { operationsEndPoint } from "../auth/apiConstants";

import { IFiveOperations } from "../../../types/pages/Expenses";

export const getFiveIncomeTransactions = async (
	baseUrl: string,
	data: { type?: string } = { type: "income" },
): Promise<AxiosResponse<IFiveOperations[]>> => {
	return await axios(`${baseUrl}/${operationsEndPoint}/`, {
		method: "GET",
		params: {
			type: data.type,
		},
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
