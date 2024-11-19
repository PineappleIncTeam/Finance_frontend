import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CookieStatusList, IUserStorageSettings } from "../../../../types/redux/StoreTypes";

const initialState: IUserStorageSettings = {
	status: "pending",
	login: false,
};

const userStorageSettings = createSlice({
	name: "userStorageSettings",
	initialState,
	reducers: {
		setCookieStatus(state: IUserStorageSettings, action: PayloadAction<CookieStatusList>) {
			state.status = action.payload;
		},
		isAutoLogin(state: IUserStorageSettings, action: PayloadAction<boolean>) {
			state.login = action.payload;
		}
	},
});

export const { setCookieStatus, isAutoLogin } = userStorageSettings.actions;

export default userStorageSettings.reducer;
