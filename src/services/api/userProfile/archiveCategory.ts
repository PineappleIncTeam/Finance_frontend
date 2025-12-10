import axios from "axios";

import { categoryEndPoint } from "../auth/apiConstants";
import { IArchiveCategory } from "../../../types/pages/Expenses";

export const archiveCategory = async (baseUrl: string, id: string, data: IArchiveCategory) => {
	return await axios(`${baseUrl}/${categoryEndPoint}/${id}/`, {
		method: "PUT",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
