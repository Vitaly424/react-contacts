import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/main.scss';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "./App";
import { AuthPage } from "./pages/AuthPage";
import { routes } from './routes';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <RouterProvider router={routes} />
    </Provider>
);
