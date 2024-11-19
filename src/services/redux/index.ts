import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";

import dataReducer from "./features/infoPart/InfoPartSlice";
import userStorageSettingsReducer from "./features/userStorageSettings/userStorageSettingsSlice";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["status"],
};

const persistedStatusReducer = persistReducer(persistConfig, userStorageSettingsReducer);

const store = configureStore({
	reducer: {
		data: dataReducer,
		status: persistedStatusReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
		}),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

export default store;
