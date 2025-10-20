import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	data: "",
	dataRange: "",
};

export const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		setDateCalendar(state, action) {
			state.data = action.payload.data;
		},
		setDateCalendarRange(state, action) {
			state.dataRange = action.payload.dataRange;
		},
	},
});
