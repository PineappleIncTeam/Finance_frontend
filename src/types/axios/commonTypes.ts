import { AxiosRequestConfig } from "axios";

export interface IPromiseCallback {
	resolve: (value: unknown) => void;
	reject: (reason?: unknown) => void;
}

export interface IFailedOriginalRequest extends AxiosRequestConfig {
	_retry?: boolean;
}
