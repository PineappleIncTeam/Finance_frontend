import axios from "axios";
import { baseURL, signInEndpoint } from "./apiConstants";
import { ISignInForm } from "../../../types/components/ComponentsTypes";

export const loginUser = async (loginData: ISignInForm) => {
	return await axios(`${baseURL}/${signInEndpoint}`, {
		method: "POST",
		data: loginData,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
