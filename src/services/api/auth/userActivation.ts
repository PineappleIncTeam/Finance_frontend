import axios from "axios";

import { userActivationEndpoint } from "./apiConstants";

export const userActivation = async (baseUrl: string) => {
  return await axios(`${baseUrl}/${userActivationEndpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};
