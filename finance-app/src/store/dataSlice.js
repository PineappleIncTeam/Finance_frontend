import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
};

const dataReducer = createSlice({
  name: "data",
  initialState,
  reducers: {
    setDateCalendar(state, action) {
      state.data = action.payload.data;
    },
  },
});

export const { setDateCalendar, removeDateCalendar } = dataReducer.actions;

export default dataReducer.reducer;
