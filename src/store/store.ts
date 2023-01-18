import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import toastReducer from "./toastSlice";
import managerReducer from "./managerSlice";
import tabsReducer from "./tabsSlice";
import documentsReducer from "./documentsSlice";

const reducers = combineReducers({
    auth: authReducer,
    toast: toastReducer,
    manager: managerReducer,
    tabs: tabsReducer,
    documents: documentsReducer
})

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch