import axios from "axios";

import { getCategoriesAllEndPoint } from "../auth/apiConstants";
import { ICategoriesAll } from "../../../types/pages/Expenses";

export const GetCategoriesAll = async (baseUrl: string, data: ICategoriesAll) => {
	return await axios(`${baseUrl}/${getCategoriesAllEndPoint}`, {
		method: "GET",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
