import axios from "axios";

import { DeleteUserCategoriesEndpoint } from "./apiConstants";

export const deleteUserCategories = async (
  baseURL: string,
  categoryId: number,
) => {
  const url = `${baseURL}${DeleteUserCategoriesEndpoint.replace("{id}", categoryId.toString())}`;
  console.log("URL для удаления категории:", url); 

  try {
      const response = await axios.delete(url, {
          headers: {
              "Content-Type": "application/json",
          },
          withCredentials: true,
      });

      console.log("Ответ сервера:", response.status, response.data);
      return response;
  } catch (error) {
      console.error("Ошибка при удалении категории:", error.response?.data || error.message); 
      throw error;
  }
};