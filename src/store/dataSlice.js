import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
  dataRange: "",
};

const dataReducer = createSlice({
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

export const { setDateCalendar, setDateCalendarRange, data } = dataReducer.actions;

export default dataReducer.reducer;
