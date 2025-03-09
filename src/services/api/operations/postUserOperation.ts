import axios from "axios";

import { UserOperationEndpoint } from "./apiConstants";

interface IUserOperationData {
    type: string;
    amount: number;
    date: string;
    categories?: number; 
    target?: number;
  }


export const postUserOperations = async (baseURL: string, operationData: IUserOperationData) => {
      const response = await axios({
        method: "POST",
        url: `${baseURL}/${UserOperationEndpoint}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: operationData, 
      });
  
      return response.data; // возвращаем данные из ответа
  };
