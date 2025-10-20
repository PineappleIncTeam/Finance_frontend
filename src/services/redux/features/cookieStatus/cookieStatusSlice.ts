import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CookieStatusList, ICookieStatus } from "../../../../types/redux/StoreTypes";

const initialState: ICookieStatus = {
	cookieStatus: "pending",
};

export const cookieStatusSlice = createSlice({
	name: "cookieStatus",
	initialState,
	reducers: {
		setCookieStatus(state: ICookieStatus, action: PayloadAction<CookieStatusList>) {
			state.cookieStatus = action.payload;
		},
	},
});
