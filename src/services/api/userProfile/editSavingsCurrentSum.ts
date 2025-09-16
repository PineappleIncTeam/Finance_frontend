import axios from "axios";

import { targetsAddSumEndPoint } from "../auth/apiConstants";
import { ISavingsTargetAddTransactionForm } from "../../../types/api/Savings";

export const editSavingsCurrentSum = async (baseUrl: string, data: ISavingsTargetAddTransactionForm) => {
	return await axios(`${baseUrl}/${targetsAddSumEndPoint}/`, {
		method: "POST",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
