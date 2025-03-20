import axios from "axios";

import { UserCategoriesEndpoint } from "./apiConstants";

export const postUserCategories = async (
    baseURL: string,
    categoryData: { name: string; is_income: boolean; is_outcome: boolean; is_deleted: boolean, is_system: boolean }
  ) => {
    return await axios(
      `${baseURL}/${UserCategoriesEndpoint}`,
      {
        method: "POST",
        data: categoryData,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  };