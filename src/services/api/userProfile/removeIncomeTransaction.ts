import axios from "axios";

import { operationsEndPoint } from "../auth/apiConstants";

export const removeIncomeTransaction = async (baseUrl: string, id: string) => {
	return await axios(`${baseUrl}/${operationsEndPoint}/${id}/`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
