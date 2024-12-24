import axios from "axios";

import { INewPassword } from "../../../types/pages/Password";

import { resetPasswordEndPoint } from "./apiConstants";

export const ResetPassword = async (baseUrl: string, userEmail: INewPassword) => {
	return await axios(`${baseUrl}/${resetPasswordEndPoint}`, {
		method: "POST",
		data: userEmail,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
