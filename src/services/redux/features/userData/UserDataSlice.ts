import { createSlice } from "@reduxjs/toolkit";

// const authTokenStorage = localStorage.getItem("token");
// const balanceSum = localStorage.getItem("balans");

const initialState = {
	token: null,
	balanceString: 0,
	balanceCosts: 0,
	balanceBase: "balanceSum",
};

const slice = createSlice({
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
			state.balanceString = action.payload.balansString;
		},
		costsBalance(state, action) {
			state.balanceCosts = action.payload.balansCosts;
		},
	},
});

export const { setUser, removeUser, stringBalance, costsBalance } = slice.actions;

export default slice.reducer;
