import { createBrowserRouter } from "react-router-dom"
import Login from "../pages/Login"
import Menu from "../pages/Menu"
import Start from "../pages/Start"
import Reservations from "../pages/Reservations"
import Checkout from "../pages/Checkout"
import Management from "../pages/Management"
import Settings from "../pages/Settings"
import Ratings from "../pages/Ratings"
import FormEstablishment from "../pages/Settings/forms/establishment"
import FormOpening from "../pages/Settings/forms/openingHour"
import ColaboratorsForm from "../pages/Settings/forms/colaborators"
import PriceTableForm from "../pages/Settings/forms/priceTable"

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
            },
            {
                path: "/settings/establishment",
                element: <FormEstablishment />
            },
            {
                path: "/settings/funcionamento",
                element: <FormOpening />
            },
            {
                path: "/settings/colaborators",
                element: <ColaboratorsForm />
            },
            {
                path: "/settings/table",
                element: <PriceTableForm />
            },
            {
                path: "/rating",
                element: <Ratings />
            }
        ]
    }
]);