import axios from "axios";

import { targetsEndPoint } from "../auth/apiConstants";
import { ITargetAdd } from "../../../types/pages/Savings";

export const AddTarget = async (baseUrl: string, data: ITargetAdd) => {
	return await axios(`${baseUrl}/${targetsEndPoint}`, {
		method: "POST",
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});
};
