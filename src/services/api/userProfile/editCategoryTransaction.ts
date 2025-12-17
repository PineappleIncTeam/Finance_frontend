import axios from "axios";

import { operationsEndPoint } from "../auth/apiConstants";
import { IEditOperation } from "../../../types/pages/Expenses";

export const editCategoryTransaction = async (baseUrl: string, id: string, data: IEditOperation) => {
	return await axios(`${baseUrl}/${operationsEndPoint}/${id}/`, {
		method: "PATCH",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
