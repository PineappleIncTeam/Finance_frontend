import { configureStore } from "@reduxjs/toolkit";

import dataReducer from "./features/infoPart/InfoPartSlice";
import statusReducer from "./features/cookieStatus/cookieStatusSlice";

const store = configureStore({
	reducer: {
		data: dataReducer,
		status: statusReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
