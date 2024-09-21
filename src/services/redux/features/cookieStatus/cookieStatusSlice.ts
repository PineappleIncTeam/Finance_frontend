import { createSlice } from "@reduxjs/toolkit";

import { ICookieStatus } from "../../../../types/redux/StoreTypes";

const initialState: ICookieStatus = {
	status: "pending",
};

const cookieStatus = createSlice({
	name: "cookieStatus",
	initialState,
	reducers: {
		setCookieStatus(state, action) {
			state.status = action.payload;
		},
	},
});

export const { setCookieStatus } = cookieStatus.actions;

export default cookieStatus.reducer;
