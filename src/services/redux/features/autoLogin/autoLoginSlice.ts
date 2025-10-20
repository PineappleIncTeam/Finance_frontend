import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAutoLoginState } from "../../../../types/redux/StoreTypes";

const initialState: IAutoLoginState = {
	isAutoLogin: false,
};

export const autoLoginSlice = createSlice({
	name: "userStorageSettings",
	initialState,
	reducers: {
		setAutoLoginStatus(state: IAutoLoginState, action: PayloadAction<boolean>) {
			state.isAutoLogin = action.payload;
		},
	},
});
