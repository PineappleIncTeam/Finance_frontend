import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CookieStatusList, IUserStorageSettings } from "../../../../types/redux/StoreTypes";


const initialState: IUserStorageSettings = {
	cookieStatus: "pending",
	loginStatus: false,
};

const statusReducer = createSlice({
	name: "userStorageSettings",
	initialState,
	reducers: {
		setCookieStatus(state: IUserStorageSettings, action: PayloadAction<CookieStatusList>) {
			state.cookieStatus = action.payload;
		},
		setAutoLoginStatus(state: IUserStorageSettings, action: PayloadAction<boolean>) {
			state.loginStatus = action.payload;
		},
	},
});

export const { setCookieStatus, setAutoLoginStatus } = statusReducer.actions;

export default statusReducer.reducer;
