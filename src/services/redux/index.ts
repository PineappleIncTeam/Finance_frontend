import { configureStore } from "@reduxjs/toolkit";

import sliceReducer from "./features/userData/UserDataSlice";
import dataReducer from "./features/infoPart/InfoPartSlice";

const store = configureStore({
	reducer: {
		user: sliceReducer,
		data: dataReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
