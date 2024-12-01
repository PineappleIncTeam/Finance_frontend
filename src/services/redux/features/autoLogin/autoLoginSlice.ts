import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAutoLoginState } from "../../../../types/redux/StoreTypes";

const initialState: IAutoLoginState = {
	isAutoLogin: false,
};

const autoLoginSlice = createSlice({
	name: "userStorageSettings",
	initialState,
	reducers: {
		setAutoLoginStatus(state: IAutoLoginState, action: PayloadAction<boolean>) {
			state.isAutoLogin = action.payload;
		},
	},
});

export const { setAutoLoginStatus } = autoLoginSlice.actions;
export default autoLoginSlice.reducer;
