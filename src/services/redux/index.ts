import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import dataReducer from "./features/infoPart/InfoPartSlice";
import statusReducer from "./features/cookieStatus/cookieStatusSlice";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["status"],
};

const persistedStatusReducer = persistReducer(persistConfig, statusReducer);

const store = configureStore({
	reducer: {
		data: dataReducer,
		status: persistedStatusReducer,
	},
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

export default store;
