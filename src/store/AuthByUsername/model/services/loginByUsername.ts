import { createAsyncThunk } from '@reduxjs/toolkit';
// import { User, userActions } from 'entities/User';
// import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { $api } from "api/api";
import { User } from "../../../User/model/types/user";
import { USER_LOCALSTORAGE_KEY } from "const/localStorage";
import { userActions } from "../../../User";

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    {rejectValue: string}
>(
    'login/loginByUsername',
    async (authData, thunkApi) => {
        const {  dispatch, rejectWithValue } = thunkApi;

        try {
            const response = await $api.post<User>('/login', authData);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
