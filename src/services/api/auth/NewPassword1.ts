import axios from "axios";

export const changeUserPassword = async (userData: string) => {
	return await axios.post("URLS.resetPasswordConfirm", userData);
};
