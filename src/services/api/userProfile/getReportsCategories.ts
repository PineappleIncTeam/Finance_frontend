import axios from "axios";

import { reportsCategoriesEndPoint } from "../auth/apiConstants";
import { IBaseURLDataRequest } from "../../../types/common/ApiTypes";

export const getReportsCategories = async ({ baseURL }: IBaseURLDataRequest) => {
	return await axios(`${baseURL}/${reportsCategoriesEndPoint}/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
		withTokenRefresh: true,
	});
};
