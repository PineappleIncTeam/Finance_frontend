import { createSlice } from "@reduxjs/toolkit";

import { IStatistics } from "../../../../types/api/Reports";

import { reportsStatisticsActions } from "../../../../types/redux/sagaActions/storeSaga.actions";

interface IReportsStatisticsState {
	data: IStatistics | null;
	loading: boolean;
	error: string | null;
}

const initialState: IReportsStatisticsState = {
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
