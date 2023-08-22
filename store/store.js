import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import authReducer from "@/store/authSlice";
export default configureStore({
    reducer: {
        cart: cartSlice,
        auth: authReducer,
    },
});
