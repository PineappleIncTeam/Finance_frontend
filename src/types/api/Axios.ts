import "axios";

declare module "axios" {
	export interface IAxiosRequestConfig {
		withTokenRefresh?: boolean;
	}
}
