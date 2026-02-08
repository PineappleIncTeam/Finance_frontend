import { createSlice } from "@reduxjs/toolkit";

import { reportsStatisticsActions } from "../../../../types/redux/sagaActions/storeSaga.actions";

const initialState = {
	data: null,
	loading: false,
	error: null,
};

export const reportsStatisticsSlice = createSlice({
	name: "reportsStatistics",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(reportsStatisticsActions.pending, (state) => {
				state.loading = true;
			})
			.addCase(reportsStatisticsActions.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(reportsStatisticsActions.rejected, (state, action) => {
				state.loading = false;
			});
	},
});
