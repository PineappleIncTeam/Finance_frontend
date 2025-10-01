/* eslint-disable camelcase */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUserDataState, IUserState } from "../../../../types/redux/StateTypes";
import { userDataActions } from "../../../../types/redux/sagaActions/storeSaga.actions";
import { IFetchUserDataResponse } from "../../../../types/api/PersonalAccount";
import { ruCountryNumber } from "../../../../helpers/userDataConstants";

const initialState: IUserState = {
	balanceString: 0,
	balanceCosts: 0,
	balanceBase: "balanceSum",
	userData: {
		email: "",
		nickname: "",
		country: ruCountryNumber,
		country_name: "",
		gender: "M",
		avatar: "",
		defaultAvatar: 0,
	},
	loading: false,
	error: null,
};

const userDataSlice = createSlice({
	name: "userData",
	initialState,
	reducers: {
		setUser(state: IUserState, action: PayloadAction<Partial<IUserDataState>>) {
			const payload: any = action.payload || {};
			state.userData = {
				...(state.userData || {}),
				...(payload.userData || payload),
			} as IUserDataState;
		},
	},
	extraReducers(builder) {
		builder.addCase(userDataActions.pending, (state: IUserState) => {
			state.loading = true;
		});
		builder.addCase(userDataActions.fulfilled, (state: IUserState, action: PayloadAction<IFetchUserDataResponse>) => {
			state.loading = false;
			state.userData = action.payload;
		});
		builder.addCase(userDataActions.rejected, (state: IUserState, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export const { setUser } = userDataSlice.actions;
export default userDataSlice.reducer;
