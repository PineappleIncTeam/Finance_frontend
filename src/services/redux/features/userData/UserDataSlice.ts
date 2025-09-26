import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUserState } from "../../../../types/redux/StateTypes";

// const authTokenStorage = localStorage.getItem("token");
// const balanceSum = localStorage.getItem("balans");

const initialState: IUserState = {
	token: null,
	balanceString: 0,
	balanceCosts: 0,
	balanceBase: "balanceSum",
	userData: {
		name: "",
		email: "",
		nickname: "",
		country: "",
		gender: "",
		loading: false,
		error: null,
	},
	settings: {
		currency: "",
		theme: "",
		assistant: false,
	},
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<Partial<IUserState["userData"]> & { token?: string }>) {
			const payload: any = action.payload || {};
			state.userData = {
				...(state.userData || {}),
				...(payload.userData || payload),
			} as IUserState["userData"];
			if (payload.token) state.token = payload.token;
			state.userData.loading = false;
			state.userData.error = null;
		},
		updateUserFields(state, action: PayloadAction<Partial<IUserState["userData"]>>) {
			state.userData = {
				...(state.userData || {}),
				...(action.payload || {}),
			} as IUserState["userData"];
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.userData.loading = action.payload;
			if (action.payload) state.userData.error = null;
		},
		setError(state, action: PayloadAction<string | null>) {
			state.userData.error = action.payload;
			state.userData.loading = false;
		},
		removeUser(state) {
			state.token = null;
			state.userData = initialState.userData;
		},

		changePasswordPending(state) {
			state.userData.loading = true;
			state.userData.error = null;
		},
		changePasswordFulfilled(state) {
			state.userData.loading = false;
			state.userData.error = null;
		},
		changePasswordRejected(state, action: PayloadAction<string | null>) {
			state.userData.loading = false;
			state.userData.error = action.payload ?? "Ошибка смены пароля";
		},
	},
});

export const {
	setUser,
	updateUserFields,
	setLoading,
	setError,
	removeUser,
	changePasswordPending,
	changePasswordFulfilled,
	changePasswordRejected,
} = userSlice.actions;
export default userSlice.reducer;
