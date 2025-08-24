import { createAction } from "@reduxjs/toolkit";

export const userDataActions = {
	pending: createAction("userData/pending"),
	fulfilled: createAction<{
		name: string;
		email: string;
		nickname: string;
		country: string;
		gender: string;
	}>("userData/fulfilled"),
	rejected: createAction<string>("userData/rejected"),
	update: createAction<{
		nickname: string;
		country: string;
		gender: string;
	}>("userData/update"),
};
