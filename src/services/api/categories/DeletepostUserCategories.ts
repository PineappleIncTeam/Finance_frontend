import axios from "axios";

import { DeleteUserCategoriesEndpoint } from "./apiConstants";

export const deleteUserCategories = async (
  baseURL: string,
  categoryId: number,
) => {
  console.log("Отправка запроса на удаление категории с ID:", categoryId); // Логирование
  try {
      const response = await axios(
          `${baseURL}/${DeleteUserCategoriesEndpoint.replace("{id}", categoryId.toString())}`,
          {
              method: "DELETE",
              withCredentials: true,
          }
      );
      console.log("Ответ от сервера:", response.data); // Логирование ответа
      return response;
  } catch (error) {
      console.error("Ошибка при удалении категории:", error); // Логирование ошибки
      throw error;
  }
};