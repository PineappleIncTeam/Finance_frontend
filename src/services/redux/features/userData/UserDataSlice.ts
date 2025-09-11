import { createSlice } from "@reduxjs/toolkit";

import { IUserState } from "../../../../types/redux/StateTypes";

import { userDataActions } from "./UserDataActions";

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
		setUser(state, action) {
			localStorage.setItem("token", action.payload.token);
			state.token = action.payload.token;
		},
		setBalance(state, action) {
			localStorage.setItem("token", action.payload.token);
			state.token = action.payload.token;
		},
		removeUser(state) {
			state.token = null;
		},
		stringBalance(state, action) {
			state.balanceString = action.payload.balanceString;
		},
		costsBalance(state, action) {
			state.balanceCosts = action.payload.balanceCosts;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(userDataActions.pending, (state) => {
				state.userData.loading = true;
				state.userData.error = null;
			})
			.addCase(userDataActions.fulfilled, (state, action) => {
				state.userData.loading = false;
				state.userData = {
					...state.userData,
					...action.payload,
				};
			})
			.addCase(userDataActions.rejected, (state, action) => {
				state.userData.loading = false;
				state.userData.error = action.payload || "Ошибка при загрузке данных";
			});
	},
});

export const { setUser, removeUser, stringBalance, costsBalance } = userSlice.actions;

export default userSlice.reducer;
