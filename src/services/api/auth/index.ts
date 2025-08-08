import { setupAxiosInterceptors } from "../../axios/interceptors";

import { logoutUser } from "./Logout";

setupAxiosInterceptors();

export const authApi = {
	logoutUser,
};
