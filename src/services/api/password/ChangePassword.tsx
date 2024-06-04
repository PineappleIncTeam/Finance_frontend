import axios from "axios";

export const changePasswordRequest = async (newPassword: string) => {
	return await axios.post("URLS.newPassword", newPassword);
};