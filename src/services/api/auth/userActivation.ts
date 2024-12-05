import axios from "axios";

import { IUserActivation } from "../../../types/components/ComponentsTypes";

import { userActivationEndpoint } from "./apiConstants";

export const userActivation = async (baseUrl: string, userData: IUserActivation) => {

  return await axios(`${baseUrl}/${userActivationEndpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    data: userData,
  });
};
