import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";

import dataReducer from "./features/infoPart/InfoPartSlice";
import statusReducer from "./features/userStorageSettings/userStorageSettingsSlice";
import persistConfig from "./persist/persistConfig";

const persistedStatusReducer = persistReducer(persistConfig, statusReducer);

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
