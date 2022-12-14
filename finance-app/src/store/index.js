import { configureStore } from "@reduxjs/toolkit";

import sliceReducer from "./slice";
import dataReducer from "./dataSlice";

export default configureStore({
  reducer: {
    user: sliceReducer,
    data: dataReducer,
  },
});
