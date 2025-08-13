import axios from "axios";

import { targetsEndPoint } from "../auth/apiConstants";
import { ITargetAddForm } from "../../../types/pages/Savings";

export const AddTarget = async (baseUrl: string, data: ITargetAddForm) => {
	return await axios(`${baseUrl}/${targetsEndPoint}`, {
		method: "POST",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
