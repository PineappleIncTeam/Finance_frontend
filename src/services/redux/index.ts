import { configureStore } from "@reduxjs/toolkit";

// import sliceReducer from "./features/userData/UserDataSlice";
import dataReducer from "./features/infoPart/InfoPartSlice";
import statusReducer from "./features/cookieStatus/cookieStatusSlice";

const store = configureStore({
	reducer: {
		// user: sliceReducer,
		data: dataReducer,
		status: statusReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
