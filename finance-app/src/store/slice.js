import { createSlice } from "@reduxjs/toolkit";

const authTokenStorage = localStorage.getItem("token");

const initialState = {
  token: authTokenStorage,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.token = action.payload.token;
    },
  },
});

export const { setUser } = slice.actions;

export default slice.reducer;
