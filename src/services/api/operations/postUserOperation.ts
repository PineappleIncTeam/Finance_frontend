import axios from "axios";

import { PostUserOperationEndpoint } from "./apiConstants";
import { IOperation } from "./../../../types/common/ComponentsProps";

export const postUserOperations = async (
  baseURL: string,
  operationData: Omit<IOperation, "id"> 
) => {
  return await axios(`${baseURL}/${PostUserOperationEndpoint}/`, {
    method: "POST",
    data: operationData,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};