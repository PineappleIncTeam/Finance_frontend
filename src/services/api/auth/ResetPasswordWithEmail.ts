import axios from "axios";

import { INewPassword } from "../../../types/pages/Password";

import { resetPasswordWithEmailEndPoint } from "./apiConstants";

export const ResetPasswordWithEmail = async (baseUrl: string, userEmail: INewPassword) => {
	return await axios(`${baseUrl}/${resetPasswordWithEmailEndPoint}`, {
		method: "POST",
		data: userEmail,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
