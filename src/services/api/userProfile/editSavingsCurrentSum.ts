import axios from "axios";

import { operationsEndPoint } from "../auth/apiConstants";
import { ISavingsTargetAddTransactionForm } from "../../../types/api/Savings";

export const editSavingsCurrentSum = async (baseUrl: string, data: ISavingsTargetAddTransactionForm) => {
	return await axios(`${baseUrl}/${operationsEndPoint}/`, {
		method: "POST",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
