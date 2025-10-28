"use client";

import { useGlobalErrorHandler } from "../../hooks/useGlobalErrorHandler";
// import { useGlobalErrorHandler } from "../../../hooks/useGlobalErrorHandler";

import styles from "./errorHandler.module.scss";

export function ErrorHandler({ children }) {
	useGlobalErrorHandler();

	return <div className={styles.errorHandlerWrapper}>{children}</div>;
}
