import { configureStore } from "@reduxjs/toolkit";
import TenantAuthReducer from "./reducers/TenantAuthReducer";
import UserAuthReducer from "./reducers/UserAuthReducer";

export const store = configureStore({
    reducer:{
        TenantAuthReducer: TenantAuthReducer,
        UserAuthReducer: UserAuthReducer
    }
})
