import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";

import dataReducer from "./features/infoPart/InfoPartSlice";
import cookieStatusSlice from "./features/cookieStatus/cookieStatusSlice";
import autoLoginSlice from "./features/autoLogin/autoLoginSlice";
import userReducer from "./features/userData/UserDataSlice";

import persistConfig from "./persist/persistConfig";

const RootReducer = combineReducers({
	data: dataReducer,
	cookieStatus: cookieStatusSlice,
	autoLogin: autoLoginSlice,
	user: userReducer,
});

const persistedRootReducer = persistReducer(persistConfig, RootReducer);

const store = configureStore({
	reducer: persistedRootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
		}),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

export default store;
