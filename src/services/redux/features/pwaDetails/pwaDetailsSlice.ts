import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IPWADetailsState } from "../../../../types/redux/StateTypes";

const initialState: IPWADetailsState = {
	canInstall: false,
	isInstalled: false,
};

export const pwaDetailsSlice = createSlice({
	name: "pwaDetails",
	initialState,
	reducers: {
		setCanInstall(state: IPWADetailsState, action: PayloadAction<boolean>) {
			state.canInstall = action.payload;
		},
		setIsPWAInstalled(state: IPWADetailsState, action: PayloadAction<boolean>) {
			state.isInstalled = action.payload;
		},
	},
});
