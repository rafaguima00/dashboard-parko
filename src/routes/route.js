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
import ErrorPage from "../pages/Error"

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
                element: <Start />,
                errorElement: <ErrorPage />
            },
            {
                path: "/reservations",
                element: <Reservations />,
                errorElement: <ErrorPage />
            },
            {
                path: "/checkout",
                element: <Checkout />,
                errorElement: <ErrorPage />
            },
            {
                path: "/management",
                element: <Management />,
                errorElement: <ErrorPage />
            },
            {
                path: "/settings",
                element: <Settings />,
                errorElement: <ErrorPage />
            },
            {
                path: "/settings/establishment",
                element: <FormEstablishment />,
                errorElement: <ErrorPage />
            },
            {
                path: "/settings/funcionamento",
                element: <FormOpening />,
                errorElement: <ErrorPage />
            },
            {
                path: "/settings/colaborators",
                element: <ColaboratorsForm />,
                errorElement: <ErrorPage />
            },
            {
                path: "/settings/table",
                element: <PriceTableForm />,
                errorElement: <ErrorPage />
            },
            {
                path: "/rating",
                element: <Ratings />,
                errorElement: <ErrorPage />
            }
        ]
    }
])