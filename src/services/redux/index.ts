import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import dataReducer from "./features/infoPart/InfoPartSlice";
import cookieStatusSlice from "./features/cookieStatus/cookieStatusSlice";
import autoLoginSlice from "./features/autoLogin/autoLoginSlice";
import userReducer from "./features/userData/UserDataSlice";

import persistConfig from "./persist/persistConfig";
import { watchUserData } from "./features/userData/UserDataSaga";

const RootReducer = combineReducers({
	data: dataReducer,
	cookieStatus: cookieStatusSlice,
	autoLogin: autoLoginSlice,
	user: userReducer,
});

const persistedRootReducer = persistReducer(persistConfig, RootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: persistedRootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
		}).concat(sagaMiddleware),
});

sagaMiddleware.run(function* rootSaga() {
	yield all([watchUserData()]);
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type DispatchTyped = typeof store.dispatch;

export default store;
