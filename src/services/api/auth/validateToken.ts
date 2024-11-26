import axios from "axios";

import { validateTokenEndpoint } from "./apiConstants";

export const validateToken = async (baseUrl: string) => {
  return await axios(`${baseUrl}/${validateTokenEndpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};