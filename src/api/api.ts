import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'const/localStorage';


export const $api = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        authorization: JSON.stringify(localStorage.getItem(USER_LOCALSTORAGE_KEY)) || '',
    },
});
