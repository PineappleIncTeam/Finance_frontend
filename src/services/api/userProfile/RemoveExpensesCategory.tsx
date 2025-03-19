import axios from "axios";

import { removeCategoryExpensesEndPoint } from "../auth/apiConstants";

export const RemoveExpensesCategory = async (baseUrl: string, id: number) => {
	return await axios(`${baseUrl}/${removeCategoryExpensesEndPoint}/${String(id)}/`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
