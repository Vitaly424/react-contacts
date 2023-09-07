import { createBrowserRouter } from "react-router-dom";
import AuthPage from "pages/AuthPage/AuthPage";
import App from "../App";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ContactsPage } from "../pages/ContactsPage";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <AuthPage />,
            },
            {
                path: 'contacts',
                element: <ContactsPage />,
            },
            {
                path: "*",
                element: <NotFoundPage />,
            }
        ]
    },
]);
