import axios from "axios";

import { IChangePassword } from "../../../types/pages/Password";

import { setPasswordEndpoint } from "./apiConstants";

export const SetNewPassword = async (baseUrl: string, newPassword: IChangePassword) => {
	return await axios(`${baseUrl}/${setPasswordEndpoint}`, {
		method: "POST",
		data: newPassword,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
