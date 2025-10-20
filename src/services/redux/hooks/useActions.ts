import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";

import { RootActions } from "..";

import { useAppDispatch } from "./useAppDispatch";

export const useActions = () => {
	const dispatch = useAppDispatch();

	return useMemo(() => bindActionCreators(RootActions, dispatch), [dispatch]);
};
