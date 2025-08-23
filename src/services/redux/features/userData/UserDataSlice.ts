import { createSlice } from "@reduxjs/toolkit";

// const authTokenStorage = localStorage.getItem("token");
// const balanceSum = localStorage.getItem("balans");

interface IUserState {
	token: string | null;
	balanceString: number;
	balanceCosts: number;
	balanceBase: string;
	userData: {
		name: string;
		email: string;
		nickname: string;
		country: string;
		gender: string;
		loading: boolean;
		error: string | null;
	};
}

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
});

export const { setUser, removeUser, stringBalance, costsBalance } = userSlice.actions;

export default userSlice.reducer;
