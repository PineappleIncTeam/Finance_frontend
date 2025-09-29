/* eslint-disable camelcase */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUserDataState, IUserSettingsState, IUserState } from "../../../../types/redux/StateTypes";
import { userDataActions } from "../../../../types/redux/sagaActions/storeSaga.actions";
import { IFetchUserDataResponse } from "../../../../types/api/PersonalAccount";

// const authTokenStorage = localStorage.getItem("token");
// const balanceSum = localStorage.getItem("balans");

const initialState: IUserState = {
	balanceString: 0,
	balanceCosts: 0,
	balanceBase: "balanceSum",
	userData: {
		email: "",
		nickname: "",
		country: 1,
		country_name: "",
		gender: "M",
		avatar: "",
		defaultAvatar: 0,
	},
	settings: {
		currency: "",
		theme: "",
		assistant: false,
	},
	loading: false,
	error: null,
};

const userDataSlice = createSlice({
	name: "userData",
	initialState,
	reducers: {
		setUser(state: IUserState, action: PayloadAction<Partial<IUserDataState>>) {
			const payload: any = action.payload || {};
			state.userData = {
				...(state.userData || {}),
				...(payload.userData || payload),
			} as IUserState["userData"];
		},
		updateUserFields(state: IUserState, action: PayloadAction<Partial<IUserDataState>>) {
			state.userData = {
				...(state.userData || {}),
				...(action.payload || {}),
			} as IUserState["userData"];
		},
		setUserSettings(state: IUserState, action: PayloadAction<Partial<IUserSettingsState>>) {
			state.settings.assistant = action.payload.assistant || false;
			state.settings.theme = action.payload.theme || "light";
			state.settings.currency = action.payload.currency || "Российский рубль";
		},
	},
	extraReducers(builder) {
		builder.addCase(userDataActions.pending, (state: IUserState) => {
			state.loading = true;
		});
		builder.addCase(userDataActions.fulfilled, (state: IUserState, action: PayloadAction<IFetchUserDataResponse>) => {
			state.loading = false;
			state.userData = action.payload;
		});
		builder.addCase(userDataActions.rejected, (state: IUserState, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export const { setUser, updateUserFields, setUserSettings } = userDataSlice.actions;
export default userDataSlice.reducer;
