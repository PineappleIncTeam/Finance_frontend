import axios from "axios";

import { DeleteUserCategoriesEndpoint } from "./apiConstants";

export const deleteUserCategories = async (
    baseURL: string,
    categoryId: number,
  ) => {
    return await axios(
      `${baseURL}/${DeleteUserCategoriesEndpoint.replace("{id}", categoryId.toString())}`,
      {
        method: "DELETE",
        withCredentials: true,
      }
    );
  };