/* eslint-disable camelcase */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { reportsStatisticsActions } from "../../../../types/redux/sagaActions/storeSaga.actions";
import { IReportsStatisticsDataState, IReportsStatisticsState } from "../../../../types/redux/StateTypes";

const initialState: IReportsStatisticsState = {
	data: {
		total_expenses: 0,
		total_income: 0,
		total_savings: 0,
	},
	loading: false,
	error: null,
};

export const reportsStatisticsSlice = createSlice({
	name: "reportsStatistics",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(reportsStatisticsActions.pending, (state: IReportsStatisticsState) => {
				state.loading = true;
			})
			.addCase(
				reportsStatisticsActions.fulfilled,
				(state: IReportsStatisticsState, action: PayloadAction<IReportsStatisticsDataState>) => {
					state.loading = false;
					state.data = action.payload;
				},
			)
			.addCase(reportsStatisticsActions.rejected, (state: IReportsStatisticsState, action: PayloadAction<string>) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
