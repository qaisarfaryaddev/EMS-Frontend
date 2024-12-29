import { createBrowserRouter } from 'react-router-dom';
import Login from '../Pages/Login';
import ErrorPage from '../Pages/ErrorPage';
import Home from '../Pages/Home';

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path:"/home",
        element:<Home />
    },
    {
        path: "*",
        element: <ErrorPage /> // Custom Error Page
    }
]);