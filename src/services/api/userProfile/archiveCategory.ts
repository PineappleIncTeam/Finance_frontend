import axios from "axios";

import { expensesCategoryEndPoint } from "../auth/apiConstants";
import { IArchiveCategory } from "../../../types/pages/Expenses";

export const archiveCategory = async (baseUrl: string, id: string, data: IArchiveCategory) => {
	return await axios(`${baseUrl}/${expensesCategoryEndPoint}/${id}/`, {
		method: "PUT",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
