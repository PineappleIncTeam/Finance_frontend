import axios from "axios";

import { targetsEndPoint } from "../auth/apiConstants";
import { ISavingsTargetAddForm } from "../../../types/pages/Savings";

export const AddSavingsTarget = async (baseUrl: string, data: ISavingsTargetAddForm) => {
	return await axios(`${baseUrl}/${targetsEndPoint}`, {
		method: "POST",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
