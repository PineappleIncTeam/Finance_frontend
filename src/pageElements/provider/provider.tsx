"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { IProviderList } from "../../types/redux/StoreTypes";
import { ApiErrorProvider } from "../../components/mainLayout/errorHandlerElements/apiErrorModal/apiErrorProvider";
import store, { persistor } from "../../services/redux";
import { ErrorHandler } from "../../components/mainLayout/errorHandlerElements/errorHandler/errorHandler";
import { AsyncErrorModalProvider } from "../../components/mainLayout/errorHandlerElements/asyncErrorModal/asyncErrorProvider";
import { AsyncErrorModal } from "../../components/mainLayout/errorHandlerElements/asyncErrorModal/asyncErrorModal";
import { ClientNetworkErrorModal } from "../../components/mainLayout/errorHandlerElements/clientNetworkErrorModal/clientNetworkErrorModal";
import { ClientNetworkErrorModalProvider } from "../../components/mainLayout/errorHandlerElements/clientNetworkErrorModal/clientNetworkErrorModalProvider";

const ProviderList = ({ children }: IProviderList) => {
	return (
		<ErrorHandler>
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
		</ErrorHandler>
	);
};

export default ProviderList;
