import axios from "axios";

import { ITransactionTypePayload } from "../../../types/pages/ProfitMoney";
import { operationsEndPoint } from "../auth/apiConstants";

export const getFiveIncomeTransactions = async (baseUrl: string, data: ITransactionTypePayload) => {
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
