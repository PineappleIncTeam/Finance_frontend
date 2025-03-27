import axios from "axios";

import { GetUserReportsEndpoint } from "./apiConstants";

export const getUserReports = async (baseURL: string) => {
    try {
      const response = await axios.get(`${baseURL}/${GetUserReportsEndpoint}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
    });
      
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении статистик пользователя: ", error);
      throw error;
    }
  };