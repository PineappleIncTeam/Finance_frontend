"use client";

import { Provider } from "react-redux";

import { IProviderList } from "../../types/redux/StoreTypes";

import store from ".";

const ProviderList = ({ children }: IProviderList) => {
	return <Provider store={store}>{children}</Provider>;
};

export default ProviderList;
