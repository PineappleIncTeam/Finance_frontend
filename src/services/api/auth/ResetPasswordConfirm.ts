import axios from "axios";

import { IChangePassword } from "../../../types/pages/Password";

import { resetPasswordConfirmEndPoint } from "./apiConstants";

export const SetPassword = async (baseUrl: string, newPassword: IChangePassword) => {
	return await axios(`${baseUrl}/${resetPasswordConfirmEndPoint}`, {
		method: "POST",
		data: newPassword,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
