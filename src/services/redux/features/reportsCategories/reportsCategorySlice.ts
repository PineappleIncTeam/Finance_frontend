import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IReportsCategoriesDataState, IReportsCategoriesState } from "../../../../types/redux/StateTypes";
import { reportCategoriesActions } from "../../../../types/redux/sagaActions/storeSaga.actions";

const initialState: IReportsCategoriesState = {
	categoriesData: {
		incomes: [],
		outcomes: [],
		targets: [],
	},
	loading: false,
	error: null,
};

export const reportsCategorySlice = createSlice({
	name: "reportsCategories",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(reportCategoriesActions.pending, (state: IReportsCategoriesState) => {
			state.loading = true;
		});
		builder.addCase(
			reportCategoriesActions.fulfilled,
			(state: IReportsCategoriesState, action: PayloadAction<IReportsCategoriesDataState>) => {
				state.loading = false;
				state.categoriesData = action.payload;
			},
		);
		builder.addCase(
			reportCategoriesActions.rejected,
			(state: IReportsCategoriesState, action: PayloadAction<string>) => {
				state.loading = false;
				state.error = action.payload;
			},
		);
	},
});
