import axios from "axios";

import { categoryEndPoint } from "../auth/apiConstants";

export const removeExpensesCategory = async (baseUrl: string, id: string) => {
	return await axios(`${baseUrl}/${categoryEndPoint}/${id}/`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
