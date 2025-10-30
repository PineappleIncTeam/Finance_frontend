"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { IProviderList } from "../../types/redux/StoreTypes";
import { ApiErrorProvider } from "../../ui/apiErrorModal/apiErrorProvider";
import store, { persistor } from "../redux";

const ProviderList = ({ children }: IProviderList) => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<ApiErrorProvider>{children}</ApiErrorProvider>
			</PersistGate>
		</Provider>
	);
};

export default ProviderList;
