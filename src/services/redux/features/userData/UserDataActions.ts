import { createAction } from "@reduxjs/toolkit";

import { IPrivateAppSettings } from "../../../../types/pages/userProfileSettings";

export const userDataActions = {
	fetch: createAction("userData/fetch"),
	pending: createAction("userData/pending"),
	fulfilled: createAction<{
		name: string;
		email: string;
		nickname: string;
		country: string;
		gender: string;
		avatar?: string;
		settings?: IPrivateAppSettings;
	}>("userData/fulfilled"),
	rejected: createAction<string>("userData/rejected"),
	update: createAction<
		Partial<{
			nickname: string;
			country: string;
			gender: string;
			avatar: string;
			settings: IPrivateAppSettings;
		}>
	>("userData/update"),
};
