import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICountryData } from "../../../../types/api/PersonalAccount";
import { ICountriesDataState } from "../../../../types/redux/StateTypes";
import { countriesDataActions } from "../../../../types/redux/sagaActions/storeSaga.actions";

const initialState: ICountriesDataState = {
	countries: [],
	loading: false,
	error: null,
};

const countriesDataSlice = createSlice({
	name: "countriesData",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(countriesDataActions.pending, (state: ICountriesDataState) => {
			state.loading = true;
		});
		builder.addCase(
			countriesDataActions.fulfilled,
			(state: ICountriesDataState, action: PayloadAction<ICountryData[]>) => {
				state.loading = false;
				state.countries = action.payload;
			},
		);
		builder.addCase(countriesDataActions.rejected, (state: ICountriesDataState, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export default countriesDataSlice.reducer;
