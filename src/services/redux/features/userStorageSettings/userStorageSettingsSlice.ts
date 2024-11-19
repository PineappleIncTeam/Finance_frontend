import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CookieStatusList, ICookieStatus } from "../../../../types/redux/StoreTypes";

const initialState: ICookieStatus = {
	status: "pending",
};

const userStorageSettings = createSlice({
	name: "userStorageSettings",
	initialState,
	reducers: {
		setCookieStatus(state: ICookieStatus, action: PayloadAction<CookieStatusList>) {
			state.status = action.payload;
		},
	},
});

export const { setCookieStatus } = userStorageSettings.actions;

export default userStorageSettings.reducer;
