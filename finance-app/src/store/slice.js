import { createSlice } from "@reduxjs/toolkit";

const authTokenStorage = localStorage.getItem("token");
const balansSum = localStorage.getItem("balans");

const initialState = {
  token: authTokenStorage,
  balansString: 0,
  balansCosts: 0,
  balans: balansSum,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
    },
    setBalans(state, action) {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
    },
    removeUser(state) {
      state.token = null;
    },
    stringBalans(state, action) {
      state.balansString = action.payload.balansString;
    },
    costsBalans(state, action) {
      state.balansCosts = action.payload.balansCosts;
    },
  },
});

export const { setUser, removeUser, stringBalans, costsBalans } = slice.actions;

export default slice.reducer;
