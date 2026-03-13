import { AiOutlineHome } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";
import { FiStar } from "react-icons/fi";
import { LiaCarSideSolid } from "react-icons/lia";
import { RiMoneyDollarCircleLine, RiSettings5Line } from "react-icons/ri";

export const links = [
    {
        id: 1,
        path: "/start",
        title: "Home",
        text: "Início",
        icon: AiOutlineHome
    },
    {
        id: 2,
        path: "/reservations",
        title: "Reservations",
        text: "Reservas",
        icon: LiaCarSideSolid
    },
    {
        id: 3,
        path: "/checkout",
        title: "Checkout",
        text: "Caixa",
        icon: CgNotes
    },
    {
        id: 4,
        path: "/management",
        title: "Management",
        text: "Gestão",
        icon: RiMoneyDollarCircleLine
    },
    {
        id: 5,
        path: "/settings",
        title: "Settings",
        text: "Configurações",
        icon: RiSettings5Line
    },
    {
        id: 6,
        path: "/rating",
        title: "Rating",
        text: "Avaliações",
        icon: FiStar
    }
]