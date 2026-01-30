"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { IProviderList } from "../../types/redux/StoreTypes";
import { ApiErrorProvider } from "../../components/mainLayout/errorHandlerElements/apiErrorModal/apiErrorProvider";
import store, { persistor } from "../../services/redux";
import { AsyncErrorModalProvider } from "../../components/mainLayout/errorHandlerElements/asyncErrorModal/asyncErrorProvider";
import { AsyncErrorModal } from "../../components/mainLayout/errorHandlerElements/asyncErrorModal/asyncErrorModal";
import { ClientNetworkErrorModal } from "../../components/mainLayout/errorHandlerElements/clientNetworkErrorModal/clientNetworkErrorModal";
import { ClientNetworkErrorModalProvider } from "../../components/mainLayout/errorHandlerElements/clientNetworkErrorModal/clientNetworkErrorModalProvider";

const ProviderList = ({ children }: IProviderList) => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<AsyncErrorModalProvider>
					<ClientNetworkErrorModalProvider>
						<ApiErrorProvider>
							{children}
							<AsyncErrorModal />
							<ClientNetworkErrorModal />
						</ApiErrorProvider>
					</ClientNetworkErrorModalProvider>
				</AsyncErrorModalProvider>
			</PersistGate>
		</Provider>
	);
};

export default ProviderList;
