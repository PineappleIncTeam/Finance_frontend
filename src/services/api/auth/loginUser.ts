import axios from "axios";

import { ICorrectSignInForm } from "../../../types/components/ComponentsTypes";

import { signInEndpoint } from "./apiConstants";

export const loginUser = async (baseURL: string, loginData: ICorrectSignInForm) => {
	return await axios(`${baseURL}/${signInEndpoint}`, {
		method: "POST",
		data: loginData,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
