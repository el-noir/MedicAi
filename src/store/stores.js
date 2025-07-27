import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import predictionSlice from "./slices/predictionSlice"
import uiSlice from "./slices/uiSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    predictions: predictionSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
})