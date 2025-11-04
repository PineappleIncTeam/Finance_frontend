"use client";

import { useGlobalErrorHandler } from "../../../../hooks/useGlobalErrorHandler";

import { IErrorHandler } from "../../../../types/components/ComponentsTypes";

import styles from "./errorHandler.module.scss";

export function ErrorHandler({ children }: IErrorHandler) {
	useGlobalErrorHandler();

	return <div className={styles.errorHandlerWrapper}>{children}</div>;
}
