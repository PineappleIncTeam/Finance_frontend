import axios from "axios";

import { targetsEndPoint } from "../auth/apiConstants";
import { ISavingsTargetAddForm } from "../../../types/pages/Savings";

export const editSavingsCurrentSum = async (baseUrl: string, data: ISavingsTargetAddForm) => {
	return await axios(`${baseUrl}/${targetsEndPoint}/${String(data.id)}/`, {
		method: "PUT",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
