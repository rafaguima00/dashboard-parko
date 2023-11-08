import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import Start from "../pages/Start";
import Reservations from "../pages/Reservations";
import Checkout from "../pages/Checkout";
import Management from "../pages/Management";
import Settings from "../pages/Settings";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        index: true
    },
    {
        path: "/",
        element: <Menu />,
        children: [
            {
                path: "/start",
                element: <Start />
            },
            {
                path: "/reservations",
                element: <Reservations />
            },
            {
                path: "/checkout",
                element: <Checkout />
            },
            {
                path: "/management",
                element: <Management />
            },
            {
                path: "/settings",
                element: <Settings />
            }
        ]
    }
])