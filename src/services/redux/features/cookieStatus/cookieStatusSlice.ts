import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CookieStatusList, ICookieStatus } from "../../../../types/redux/StoreTypes";

const initialState: ICookieStatus = {
	status: "pending",
};

const cookieStatus = createSlice({
	name: "cookieStatus",
	initialState,
	reducers: {
		setCookieStatus(state: ICookieStatus, action: PayloadAction<CookieStatusList>) {
			state.status = action.payload;
		},
	},
});

export const { setCookieStatus } = cookieStatus.actions;

export default cookieStatus.reducer;
