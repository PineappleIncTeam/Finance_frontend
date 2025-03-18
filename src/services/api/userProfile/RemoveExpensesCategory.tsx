import axios from "axios";

import { removeCategoryExpensesEndPoint } from "../auth/apiConstants";

export const RemoveExpensesCategory = async (baseUrl: string, id: string) => {
	return await axios(`${baseUrl}/${removeCategoryExpensesEndPoint}`, {
		method: "DELETE",
		data: id,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
