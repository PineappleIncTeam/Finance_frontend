import axios from "axios";

import { expensesCategoryEndPoint } from "../auth/apiConstants";

export const ArchiveCategory = async (baseUrl: string, id: string, isDeleted: boolean) => {
	return await axios(`${baseUrl}/${expensesCategoryEndPoint}/${id}/`, {
		method: "PUT",
		data: isDeleted,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
