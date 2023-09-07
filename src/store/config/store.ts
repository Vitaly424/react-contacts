import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from "./StateSchema";
import { loginReducer } from "../AuthByUsername";
import { useDispatch } from "react-redux";
import { userReducer } from "../User";

export const store = configureStore<StateSchema>({
    reducer: {
        loginForm: loginReducer,
        user: userReducer,
    }
})

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
