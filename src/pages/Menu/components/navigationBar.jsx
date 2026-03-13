import { Link, useLocation } from "react-router-dom"
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
    Bottom
} from "../style"
import avatar from "../../../assets/avatar.png"
import logo from "../../../assets/logo-parko.png"
import { theme } from "../../../theme/theme"
import useAuth from "../../../hooks/useAuth"
import { links } from "../../../mocks/links"

const NavigationBar = (props) => {

    const { dataClient } = useUser()

    const { removeToken } = useAuth()

    const location = useLocation()
    
    const currentPath = location.pathname

    const { colaborator, type_colaborator } = dataClient
    const { neutralColor } = theme
    const { styles, textSelected } = props

    return (
        <SideBar>
            <Image src={logo} />
            <NavBar>
                {links.map(item => (
                    <Link
                        key={item.id}
                        to={item.path}
                        style={
                            item.id === 5 && type_colaborator === "Funcionário(a)" ?
                            { display: "none" } :
                            currentPath.includes(item.path) ? styles[1] : styles[0]
                        }
                    >
                        <item.icon
                            color={currentPath.includes(item.path) ? neutralColor : "#fff"}
                            size={18}
                            title={item.title}
                        />
                        <Path style={currentPath.includes(item.path) ? textSelected : {}}>
                            {item.text}
                        </Path>
                    </Link>
                ))}
            </NavBar>
            <Bottom>
                <Profile>
                    <ImageProfile src={dataClient.image ? dataClient.image : avatar} />
                    <div>
                        <UserName>{colaborator || ""}</UserName>
                        <Logout onClick={removeToken}>Logout</Logout>
                    </div>
                </Profile>
            </Bottom>
        </SideBar>
    )
}

export default NavigationBar