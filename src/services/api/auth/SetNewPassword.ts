import axios from "axios";

import { IChangePassword } from "../../../types/pages/Password";

import { setNewPasswordEndPoint } from "./apiConstants";

export const SetNewPassword = async (baseUrl: string, newPassword: IChangePassword) => {
	return await axios(`${baseUrl}/${setNewPasswordEndPoint}`, {
		method: "POST",
		data: newPassword,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
