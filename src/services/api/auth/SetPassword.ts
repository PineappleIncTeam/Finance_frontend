import axios from "axios";

import { IChangePassword } from "../../../types/pages/Password";

import { setPasswordEndPoint } from "./apiConstants";

export const SetPassword = async (baseUrl: string, newPassword: IChangePassword) => {
	return await axios(`${baseUrl}/${setPasswordEndPoint}`, {
		method: "POST",
		data: newPassword,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
