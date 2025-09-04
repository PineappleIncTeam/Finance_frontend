"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";

import { IProviderList } from "../../types/redux/StoreTypes";

import { userDataActions } from "./features/userData/UserDataActions";

import store, { persistor } from ".";

const ProviderList = ({ children }: IProviderList) => {
	useEffect(() => {
		store.dispatch(userDataActions.fetch());
	}, []);

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>{children}</PersistGate>
		</Provider>
	);
};

export default ProviderList;
