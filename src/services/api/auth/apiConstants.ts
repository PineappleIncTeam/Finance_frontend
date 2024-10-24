import { getCorrectBaseUrl } from "../../../utils/baseUrlConverter";

export const baseURL = getCorrectBaseUrl();

export const signupEndpoint = "api/v1/auth/users/";
export const signInEndpoint = "api/v1/auth/token/login/";
