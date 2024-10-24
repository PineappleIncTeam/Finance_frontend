import axios from "axios";

import { ISignInForm } from "../../../types/components/ComponentsTypes";

import { signInEndpoint } from "./apiConstants";

export const loginUser = async (baseURL: string, loginData: ISignInForm) => {
	return await axios(`${baseURL}/${signInEndpoint}`, {
		method: "POST",
		data: loginData,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
