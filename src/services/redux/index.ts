import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import createSagaMiddleware from "redux-saga";

import dataReducer from "./features/infoPart/InfoPartSlice";
import cookieStatusSlice from "./features/cookieStatus/cookieStatusSlice";
import autoLoginSlice from "./features/autoLogin/autoLoginSlice";
import userReducer from "./features/userData/UserDataSlice";
import userSettingsReducer from "./features/userSettings/userSettingsSlice";
import countriesDataReducer from "./features/countriesData/countriesDataSlice";

// Saga watchers
import { watchFetchUserData } from "./features/userData/UserDataSaga";
import { watchFetchCountriesData } from "./features/countriesData/countriesDataSaga";

import persistConfig from "./persist/persistConfig";

const sagaMiddleware = createSagaMiddleware();

const RootReducer = combineReducers({
	data: dataReducer,
	cookieStatus: cookieStatusSlice,
	autoLogin: autoLoginSlice,
	userData: userReducer,
	userSettings: userSettingsReducer,
	countriesData: countriesDataReducer,
});

const persistedRootReducer = persistReducer(persistConfig, RootReducer);

const store = configureStore({
	reducer: persistedRootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
		}).concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchUserData);
sagaMiddleware.run(watchFetchCountriesData);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type DispatchTyped = typeof store.dispatch;

export default store;
