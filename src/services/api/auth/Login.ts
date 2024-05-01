import axios from "axios";

export const loginUser = async (loginData: string) => {
	return await axios.post("URLS.authorisation", loginData);
};
