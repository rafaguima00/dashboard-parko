import { Outlet, useNavigate } from "react-router-dom";
import NavigationBar from "./components/navigationBar";
import { Container, Notification } from "./style";
import { IoNotificationsOutline } from "react-icons/io5";

const Menu = () => {

    const style = { 
        textDecoration: "none",
        display: "flex",
        flexDirection: "row",
        gap: 16,
        padding: 16,
        fontWeight: 400
    }

    const styleSelected = {
        textDecoration: "none",
        display: "flex",
        flexDirection: "row",
        gap: 16,
        backgroundColor: "#f4f4f4",
        padding: 16,
        borderRadius: 12,
        fontWeight: 400
    }

    const textSelected = {
        color: "#545454"
    }
    
    const navigate = useNavigate();

    const handleLogout = () => {
        alert("Você saiu da sua conta");

        return navigate("/");
    }

    return (
        <Container>
            <NavigationBar 
                styles={[style, styleSelected]}
                textSelected={textSelected}
                handleLogout={handleLogout} 
            />
            <Outlet />
            <Notification>
                <IoNotificationsOutline size={18} color="#523499" />
            </Notification>
        </Container>
    )
}

export default Menu;