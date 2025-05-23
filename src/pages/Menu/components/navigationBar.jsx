import { Link } from "react-router-dom"
import { useState } from "react"
import { useUser } from "../../../context/globalContext"
import {
    SideBar,
    Image,
    NavBar,
    Path,
    Profile,
    ImageProfile,
    UserName,
    Logout,
    Bottom,
    Name,
    Select
} from "../style"
import avatar from "../../../assets/avatar.png"
import logo from "../../../assets/logo-parko.png"
import { AiOutlineHome } from "react-icons/ai"
import { LiaCarSideSolid } from "react-icons/lia"
import { CgNotes } from "react-icons/cg"
import { RiMoneyDollarCircleLine, RiSettings5Line } from "react-icons/ri"
import { FiStar } from "react-icons/fi"
import { theme } from "../../../theme/theme"

const NavigationBar = (props) => {

    const { dataClient } = useUser()
    const { colaborator, type_colaborator } = dataClient
    const { primaryColor, neutralColor } = theme
    const { styles, textSelected, handleLogout } = props

    const [linkSeletected, setLinkSelected] = useState(1)

    const links = [
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

    const handleSelectItem = (id) => {
        setLinkSelected(id)
    }

    return (
        <SideBar background={primaryColor}>
            <Image src={logo} />
            <NavBar>
                {links.map(item => (
                    <Link
                        key={item.id}
                        to={item.path}
                        style={
                            item.id === 5 && type_colaborator === "Funcionário(a)" ?
                            { display: "none" } :
                            linkSeletected === item.id ? styles[1] : styles[0]
                        }
                        onClick={() => handleSelectItem(item.id)}
                        
                    >
                        <item.icon
                            color={linkSeletected === item.id ? neutralColor : "#fff"}
                            size={18}
                            title={item.title}
                        />
                        <Path style={linkSeletected === item.id ? textSelected : {}}>
                            {item.text}
                        </Path>
                    </Link>
                ))}
            </NavBar>
            <Bottom>
                {/* <span>
                    <Name>Estacionamento</Name>
                    <Select>
                        <option background={primaryColor}>Bela Park</option>
                        <option background={primaryColor}>Estacionamento x</option>
                    </Select>
                </span> */}
                <Profile>
                    <ImageProfile src={dataClient.image ? dataClient.image : avatar} />
                    <div>
                        <UserName>{colaborator ? colaborator : ""}</UserName>
                        <Logout onClick={handleLogout}>Logout</Logout>
                    </div>
                </Profile>
            </Bottom>
        </SideBar>
    )
}

export default NavigationBar