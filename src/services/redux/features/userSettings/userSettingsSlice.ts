import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUserSettingsState, TSettingUserSettings } from "../../../../types/redux/StateTypes";

const initialState: IUserSettingsState = {
	currency: "",
	theme: "",
	assistant: false,
};

export const userSettingsSlice = createSlice({
	name: "userSettings",
	initialState,
	reducers: {
		setUserSettings(state: IUserSettingsState, action: PayloadAction<TSettingUserSettings>) {
			state.currency = action.payload.currency || "Российский рубль";
			state.theme = action.payload.theme || "light";
			state.assistant = action.payload.assistant || false;
		},
	},
});
