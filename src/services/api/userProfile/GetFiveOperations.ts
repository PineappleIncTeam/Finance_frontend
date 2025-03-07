import axios from "axios";

import { getFiveOperationsEndPoint } from "../auth/apiConstants";
import { IExpensesTransaction } from "../../../types/common/ComponentsProps";

export const GetFiveOperations = async (baseUrl: string) => {
	return await axios<IExpensesTransaction>(`${baseUrl}/${getFiveOperationsEndPoint}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
