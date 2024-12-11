import axios from "axios";

export const sendMailToRecover = async (baseUrl: string) => {
	const userData = {
		email: "nl479519@bk.ru",
	};

	return await axios(`${baseUrl}/api/v1/auth/users/reset_password/`, {
		method: "POST",
		data: userData,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
