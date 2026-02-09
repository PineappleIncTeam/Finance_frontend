import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import createSagaMiddleware from "redux-saga";

import { dataSlice } from "./features/infoPart/InfoPartSlice";
import { balanceSlice } from "./features/userBalance/balanceSlice";
import { reportsStatisticsSlice } from "./features/reportStatistics/reportStatisticsSlice";
import { cookieStatusSlice } from "./features/cookieStatus/cookieStatusSlice";
import { autoLoginSlice } from "./features/autoLogin/autoLoginSlice";
import { userDataSlice } from "./features/userData/UserDataSlice";
import { userSettingsSlice } from "./features/userSettings/userSettingsSlice";
import { countriesDataSlice } from "./features/countriesData/countriesDataSlice";
import { pwaDetailsSlice } from "./features/pwaDetails/pwaDetailsSlice";

// Saga watchers
import { watchFetchUserData } from "./features/userData/UserDataSaga";
import { watchFetchCountriesData } from "./features/countriesData/countriesDataSaga";
import { watchBalanceSaga } from "./features/userBalance/balanceSaga";
import { watchReportsStatisticsSaga } from "./features/reportStatistics/reportStatisticsSaga";

import persistConfig from "./persist/persistConfig";

const sagaMiddleware = createSagaMiddleware();

const RootActions = {
	...dataSlice.actions,
	...cookieStatusSlice.actions,
	...autoLoginSlice.actions,
	...userDataSlice.actions,
	...userSettingsSlice.actions,
	...pwaDetailsSlice.actions,
};

const RootReducer = combineReducers({
	data: dataSlice.reducer,
	cookieStatus: cookieStatusSlice.reducer,
	autoLogin: autoLoginSlice.reducer,
	userData: userDataSlice.reducer,
	userSettings: userSettingsSlice.reducer,
	countriesData: countriesDataSlice.reducer,
	balance: balanceSlice.reducer,
	reportsStatistics: reportsStatisticsSlice.reducer,
	pwaDetails: pwaDetailsSlice.reducer,
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
sagaMiddleware.run(watchBalanceSaga);
sagaMiddleware.run(watchReportsStatisticsSaga);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type DispatchTyped = typeof store.dispatch;
export { RootActions };

export default store;
