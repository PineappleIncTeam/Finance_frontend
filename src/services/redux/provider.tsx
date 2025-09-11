"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { IProviderList } from "../../types/redux/StoreTypes";

import store, { persistor } from ".";

const ProviderList = ({ children }: IProviderList) => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>{children}</PersistGate>
		</Provider>
	);
};

export default ProviderList;
