export const apiClientErrorList = {
	forbidden: "403",
	requestTimeout: "408",
	tooManyRequests: "429",
} as const;

export const apiServerErrorList = {
	internalServerError: "500",
	badGateway: "502",
	serviceUnavailable: "503",
	gatewayTimeout: "504",
} as const;

export type TApiClientErrorList = (typeof apiClientErrorList)[keyof typeof apiClientErrorList];
export type TApiServerErrorList = (typeof apiServerErrorList)[keyof typeof apiServerErrorList];
