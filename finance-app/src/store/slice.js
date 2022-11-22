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
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
    },
    removeUser(state) {
      state.token = null;
    },
  },
});

export const { setUser, removeUser } = slice.actions;

export default slice.reducer;
