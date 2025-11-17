import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IBalanceState } from "../../../../types/redux/StateTypes";

import { balanceActions } from "../../../../types/redux/sagaActions/storeSaga.actions";

const initialState: IBalanceState = {
	currentBalance: 0,
	loading: false,
	error: null,
};

export const balanceSlice = createSlice({
	name: "balance",
	initialState,
	reducers: {
		setBalance(state, action: PayloadAction<{ currentBalance: number }>) {
			state.currentBalance = action.payload.currentBalance;
		},
	},
	extraReducers(builder) {
		builder.addCase(balanceActions.pending, (state: IBalanceState) => {
			state.loading = true;
		});
		builder.addCase(balanceActions.fulfilled, (state: IBalanceState, action: PayloadAction<number>) => {
			state.loading = false;
			state.currentBalance = action.payload;
		});
		builder.addCase(balanceActions.rejected, (state: IBalanceState, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});
