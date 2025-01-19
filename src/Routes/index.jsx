import { createBrowserRouter } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "../Pages/Login";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Mistakes from "../Pages/Mistakes/Mistakes";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/home",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: "/mistakes",
        element: (
            <ProtectedRoute>
                <Mistakes />
            </ProtectedRoute>
        ),
    },
    {
        path: "*",
        element: <ErrorPage />, // Custom Error Page
    },
]);
